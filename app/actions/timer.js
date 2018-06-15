// @flow
import firebase from "firebase";
import uuid from "uuid/v4";

import type { Timer, ModTimer } from "../types/Timer";
import type { Dispatch, GetState } from "../types/Store";
import { appendTrash, displayUndo } from "./trash";
import timer2dbTimer from "../utils/timer2dbTimer";

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
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${timer}`)
        .set(timer2dbTimer(timer));
    }
  };
}

type GenerateTimerAction = {
  type: "TIMER_GENERATE",
  payload: { timer: ModTimer }
};
export function generateTimer(timer: ModTimer) {
  return (dispatch: Dispatch) => {
    dispatch(
      ({
        type: "TIMER_GENERATE",
        payload: { timer }
      }: GenerateTimerAction)
    );
    const timerGen: Timer = {
      name: null,
      id: uuid(),
      timing: { paused: true },
      ...timer
    };

    dispatch(addTimer(timerGen));
  };
}

type PermRemoveTimerAction = {
  type: "TIMER_PERM_REMOVE",
  payload: { id: string }
};
export function permRemoveTimer(id: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({
        type: "TIMER_PERM_REMOVE",
        payload: { id }
      }: PermRemoveTimerAction)
    );
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
export function startTimer(id: string, baseTime: number): StartTimerAction {
  return {
    type: "TIMER_START",
    payload: { id, baseTime, now: new Date().getTime() }
  };
}

type StopTimerAction = {
  type: "TIMER_STOP",
  payload: { id: string, now: number }
};
export function stopTimer(id: string): StopTimerAction {
  return {
    type: "TIMER_STOP",
    payload: { id, now: new Date().getTime() }
  };
}

type ResetTimerAction = {
  type: "TIMER_RESET",
  payload: { id: string }
};
export function resetTimer(id: string): ResetTimerAction {
  return {
    type: "TIMER_RESET",
    payload: {
      id
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

type EditTimerAction = {
  type: "TIMER_EDIT",
  payload: {
    id: string,
    modification: ModTimer
  }
};
export function editTimer(id: string, modification: ModTimer) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      ({
        type: "TIMER_EDIT",
        payload: {
          id,
          modification
        }
      }: EditTimerAction)
    );
    const { auth, timer } = getState();
    if (auth === "loggedin") {
      window.db // $FlowIssue
        .doc(`/users/${firebase.auth().currentUser.uid}/timers/${id}`)
        .set(timer2dbTimer(timer[id]));
    }
  };
}

export type TimerAction =
  | AddTimerAction
  | GenerateTimerAction
  | PermRemoveTimerAction
  | StartTimerAction
  | StopTimerAction
  | ResetTimerAction
  | RemoveTimerAction
  | EditTimerAction;
