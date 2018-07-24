import uuid from "uuid/v4";
import isEqual from "lodash.isequal";
import { createAction } from "typesafe-actions";

import { Timer, ModTimer, Timing, ThunkAction } from "../types";
import { TimerState } from "../reducers/timer";
import trashActions, { displayUndo } from "./trash";

const actions = {
  addTimer: createAction("timer/ADD", resolve => (timer: Timer) =>
    resolve({ timer })
  ),
  generateTimer: createAction("timer/GENERATE", resolve => (timer: ModTimer) =>
    resolve({ timer })
  ),
  permRemoveTimer: createAction("timer/PERM_REMOVE", resolve => (id: string) =>
    resolve({ id })
  ),
  startTimer: createAction(
    "timer/START",
    resolve => (id: string, baseTime: number, now: number) =>
      resolve({ id, baseTime, now })
  ),
  stopTimer: createAction("timer/STOP", resolve => (id: string) =>
    resolve({ id })
  ),
  setTimingTimer: createAction(
    "timer/SET_TIMING",
    resolve => (id: string, timing: Timing) => resolve({ id, timing })
  ),
  resetTimer: createAction("timer/RESET", resolve => (id: string) =>
    resolve({ id })
  ),
  removeTimer: createAction("timer/REMOVE", resolve => (id: string) =>
    resolve({ id })
  ),
  clearTimer: createAction("timer/CLEAR"),
  editTimer: createAction(
    "timer/EDIT",
    resolve => (id: string, modification: ModTimer) =>
      resolve({ id, modification })
  ),
  syncTimer: createAction(
    "timer/SYNC",
    resolve => (newTimerState: TimerState) =>
      resolve({ timerState: newTimerState })
  )
};

export const addTimer = (
  timer: Timer,
  shouldUpload: boolean = true
): ThunkAction<void> => (dispatch, getState) => {
  dispatch(actions.addTimer(timer));
  if (!shouldUpload) {
    return;
  }
  const { auth } = getState();
  if (auth.stage === "loggedin") {
    window.db
      .doc(`/users/${auth.id}/timers/${timer.id}`)
      .set(timer.name === null ? { ...timer, name: "" } : timer);
  }
};

export const generateTimer = (
  timer?: ModTimer,
  shouldUpload: boolean = true
): ThunkAction<void> => dispatch => {
  if (timer) {
    dispatch(actions.generateTimer(timer));
  }
  const timerGen: Timer = {
    name: null,
    id: uuid(),
    timing: { paused: true, baseTime: 0 },
    ...timer
  };

  dispatch(addTimer(timerGen, shouldUpload));
};

export const permRemoveTimer = (
  id: string,
  shouldUpload: boolean = true
): ThunkAction<void> => (dispatch, getState) => {
  dispatch(actions.permRemoveTimer(id));
  if (!shouldUpload) {
    return;
  }
  const { auth } = getState();
  if (auth.stage === "loggedin") {
    window.db.doc(`/users/${auth.id}/timers/${id}`).delete();
  }
};

export const startTimer = (
  id: string,
  baseTime: number,
  shouldUpload: boolean = true
): ThunkAction<void> => (dispatch, getState) => {
  dispatch(actions.startTimer(id, baseTime, Date.now()));
  if (!shouldUpload) {
    return;
  }
  const { auth, timer } = getState();
  if (auth.stage === "loggedin") {
    window.db
      .doc(`/users/${auth.id}/timers/${id}`)
      .update({ timing: timer[id].timing });
  }
};

export const stopTimer = (
  id: string,
  shouldUpload: boolean = true
): ThunkAction<void> => (dispatch, getState) => {
  dispatch(actions.stopTimer(id));
  if (!shouldUpload) {
    return;
  }
  const { auth, timer } = getState();
  if (auth.stage === "loggedin") {
    window.db
      .doc(`/users/${auth.id}/timers/${id}`)
      .update({ timing: timer[id].timing });
  }
};

export const setTimingTimer = (
  id: string,
  timing: Timing,
  shouldUpload: boolean = true
): ThunkAction<void> => (dispatch, getState) => {
  dispatch(actions.setTimingTimer(id, timing));
  if (!shouldUpload) {
    return;
  }
  const { auth } = getState();
  if (auth.stage === "loggedin") {
    window.db.doc(`/users/${auth.id}/timers/${id}`).update({ timing });
  }
};

export const resetTimer = (
  id: string,
  shouldUpload: boolean = true
): ThunkAction<void> => (dispatch, getState) => {
  dispatch(actions.resetTimer(id));
  if (!shouldUpload) {
    return;
  }
  const { auth } = getState();
  if (auth.stage === "loggedin") {
    window.db.doc(`/users/${auth.id}/timers/${id}`).update({
      timing: {
        baseTime: 0,
        paused: true
      }
    });
  }
};

export const removeTimer = (id: string): ThunkAction<void> => (
  dispatch,
  getState
) => {
  const state = getState();
  const timer: Timer = state.timer[id];
  if (!timer) {
    return;
  }
  dispatch(stopTimer(timer.id));
  dispatch(actions.removeTimer(id));
  dispatch(trashActions.appendTrash(timer));
  dispatch(permRemoveTimer(id));
  dispatch(displayUndo());
};

export const editTimer = (
  id: string,
  modification: ModTimer,
  shouldUpload: boolean = true
): ThunkAction<void> => (dispatch, getState) => {
  dispatch(actions.editTimer(id, modification));
  if (!shouldUpload) {
    return;
  }
  const { auth, timer } = getState();
  if (auth.stage === "loggedin") {
    window.db.doc(`/users/${auth.id}/timers/${id}`).set(timer[id]);
  }
};

export const syncTimer = (newTimerState: TimerState): ThunkAction<void> => (
  dispatch,
  getState
) => {
  const state = getState();
  dispatch(actions.syncTimer(newTimerState));
  Object.entries(newTimerState).forEach(([id, newTimer]) => {
    // Add new timers
    if (!Object.prototype.hasOwnProperty.call(state.timer, id)) {
      dispatch(addTimer(newTimer, false));
      return;
    }
    const oldTimer = state.timer[id];
    // Rename timers
    if (newTimer.name !== oldTimer.name) {
      dispatch(editTimer(id, { name: newTimer.name }, false));
    }
    //
    if (!isEqual(oldTimer.timing, newTimer.timing)) {
      dispatch(setTimingTimer(id, newTimer.timing, false));
    }
  });
  // Remove old timers
  const newTimerIds = Object.keys(newTimerState);
  Object.keys(state.timer).forEach(id => {
    if (newTimerIds.indexOf(id) === -1) {
      dispatch(permRemoveTimer(id, false));
    }
  });
};

export default actions;
