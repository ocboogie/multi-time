// @flow
import firebase from "firebase/app";
import uuid from "uuid/v4";
import isEqual from "lodash.isequal";

import type { Timer, ModTimer, Timing } from "../types/Timer";
import type { Dispatch, GetState } from "../types/Store";
import type { TimerState } from "../reducers/timer";
import { appendTrash, displayUndo } from "./trash";

type AddTimerAction = {
  type: "TIMER_ADD",
  payload: { timer: Timer }
};
export function addTimer(timer: Timer, shouldUpload: boolean = true) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({
        type: "TIMER_ADD",
        payload: { timer }
      }: AddTimerAction)
    );
    if (!shouldUpload) {
      return;
    }
    const { auth } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${timer.id}`)
        .set(timer);
    }
  };
}

type GenerateTimerAction = {
  type: "TIMER_GENERATE",
  payload: { timer: ModTimer }
};
export function generateTimer(timer: ModTimer, shouldUpload: boolean = true) {
  return (dispatch: Dispatch) => {
    dispatch(
      ({ type: "TIMER_GENERATE", payload: { timer } }: GenerateTimerAction)
    );
    const timerGen: Timer = {
      name: null,
      id: uuid(),
      timing: { paused: true },
      ...timer
    };

    dispatch(addTimer(timerGen, shouldUpload));
  };
}

type PermRemoveTimerAction = {
  type: "TIMER_PERM_REMOVE",
  payload: { id: string }
};
export function permRemoveTimer(id: string, shouldUpload: boolean = true) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({ type: "TIMER_PERM_REMOVE", payload: { id } }: PermRemoveTimerAction)
    );
    if (!shouldUpload) {
      return;
    }
    const { auth } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${id}`)
        .delete();
    }
  };
}

type StartTimerAction = {
  type: "TIMER_START",
  payload: { id: string, baseTime: number, now: number }
};
export function startTimer(
  id: string,
  baseTime: number,
  shouldUpload: boolean = true
): StartTimerAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({
        type: "TIMER_START",
        payload: { id, baseTime, now: Date.now() }
      }: StartTimerAction)
    );
    if (!shouldUpload) {
      return;
    }
    const { auth, timer } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${id}`)
        .update({ timing: timer[id].timing });
    }
  };
}

type StopTimerAction = {
  type: "TIMER_STOP",
  payload: { id: string }
};
export function stopTimer(id: string, shouldUpload: boolean = true) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({
        type: "TIMER_STOP",
        payload: { id }
      }: StopTimerAction)
    );
    if (!shouldUpload) {
      return;
    }
    const { auth, timer } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${id}`)
        .update({ timing: timer[id].timing });
    }
  };
}

type SetTimingTimerAction = {
  type: "TIMER_SET_TIMING",
  payload: { id: string, timing: Timing }
};
export function setTimingTimer(
  id: string,
  timing: Timing,
  shouldUpload: boolean = true
) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({
        type: "TIMER_SET_TIMING",
        payload: { id, timing }
      }: SetTimingTimerAction)
    );
    if (!shouldUpload) {
      return;
    }
    const { auth } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${id}`)
        .update({ timing });
    }
  };
}

type ResetTimerAction = {
  type: "TIMER_RESET",
  payload: { id: string }
};
export function resetTimer(
  id: string,
  shouldUpload: boolean = true
): ResetTimerAction {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch({
      type: "TIMER_RESET",
      payload: {
        id
      }
    });
    if (!shouldUpload) {
      return;
    }
    const { auth } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${id}`)
        .update({
          timing: {
            baseTime: 0,
            paused: true
          }
        });
    }
  };
}

type RemoveTimerAction = {
  type: "TIMER_REMOVE",
  payload: { id: string }
};
export function removeTimer(id: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    const timer: Timer = state.timer[id];
    if (!timer) {
      return;
    }
    dispatch(stopTimer(timer.id));
    dispatch(
      ({
        type: "TIMER_REMOVE",
        payload: { id }
      }: RemoveTimerAction)
    );
    dispatch(appendTrash(timer));
    dispatch(permRemoveTimer(id));
    dispatch(displayUndo());
  };
}

type ClearTimerAction = {
  type: "TIMER_CLEAR"
};
export function clearTimer(): ClearTimerAction {
  return { type: "TIMER_CLEAR" };
}

type EditTimerAction = {
  type: "TIMER_EDIT",
  payload: {
    id: string,
    modification: ModTimer
  }
};
export function editTimer(
  id: string,
  modification: ModTimer,
  shouldUpload: boolean = true
) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({ type: "TIMER_EDIT", payload: { id, modification } }: EditTimerAction)
    );
    if (!shouldUpload) {
      return;
    }
    const { auth, timer } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${id}`)
        .set(timer[id]);
    }
  };
}

type SyncTimerAction = {
  type: "TIMER_SYNC",
  payload: TimerState
};
export function syncTimer(newTimerState: TimerState): SyncTimerAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    dispatch(({ type: "TIMER_SYNC", payload: newTimerState }: SyncTimerAction));
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
      if (!newTimerIds.includes(id)) {
        dispatch(permRemoveTimer(id, false));
      }
    });
  };
}

export type TimerAction =
  | AddTimerAction
  | GenerateTimerAction
  | PermRemoveTimerAction
  | StartTimerAction
  | StopTimerAction
  | SetTimingTimerAction
  | ResetTimerAction
  | RemoveTimerAction
  | ClearTimerAction
  | EditTimerAction;
