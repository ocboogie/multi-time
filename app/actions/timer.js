// @flow
import uuid from "uuid/v4";

import type { Timer, ModTimer } from "../types/Timer";
import type { Dispatch, GetState } from "../types/Store";
import { appendTrash, displayUndo } from "./trash";

type AddTimerAction = {
  type: "TIMER_ADD",
  payload: { timer: Timer }
};
export function addTimer(timer: Timer): AddTimerAction {
  return {
    type: "TIMER_ADD",
    payload: { timer }
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
      time: 0,
      paused: true,
      id: uuid(),
      ...timer
    };

    dispatch(addTimer(timerGen));
  };
}

type PermRemoveTimerAction = {
  type: "TIMER_PERM_REMOVE",
  payload: { id: string }
};
export function permRemoveTimer(id: string): PermRemoveTimerAction {
  return {
    type: "TIMER_PERM_REMOVE",
    payload: { id }
  };
}

type RemoveTimerAction = {
  type: "TIMER_REMOVE",
  payload: { id: string }
};
export function removeTimer(id: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    const timer = state.timer[id];
    if (!timer) {
      return;
    }
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

type TickTimerAction = {
  type: "TIMER_TICK",
  payload: { id: string }
};
export function tickTimer(id: string): TickTimerAction {
  return {
    type: "TIMER_TICK",
    payload: { id }
  };
}

const timers = Object.create(null);
type StartTimerAction = {
  type: "TIMER_START",
  payload: { id: string }
};
export function startTimer(id: string) {
  return (dispatch: Dispatch) => {
    clearInterval(timers[id]);
    timers[id] = setInterval(() => dispatch(tickTimer(id)), 1000);
    dispatch({
      type: "TIMER_START",
      payload: { id }
    });
    dispatch(tickTimer(id));
  };
}

type StopTimerAction = {
  type: "TIMER_STOP",
  payload: { id: string }
};
export function stopTimer(id: string) {
  return (dispatch: Dispatch) => {
    clearInterval(timers[id]);
    dispatch({
      type: "TIMER_STOP",
      payload: { id }
    });
  };
}

type EditTimerAction = {
  type: "TIMER_EDIT",
  payload: {
    id: string,
    modification: ModTimer
  }
};
export function editTimer(id: string, modification: ModTimer): EditTimerAction {
  return {
    type: "TIMER_EDIT",
    payload: {
      id,
      modification
    }
  };
}

type UndoTimerAction = {
  type: "TIMER_UNDO"
};
export function undoTimer(): UndoTimerAction {
  return {
    type: "TIMER_UNDO"
  };
}

export type TimerAction =
  | AddTimerAction
  | GenerateTimerAction
  | RemoveTimerAction
  | PermRemoveTimerAction
  | TickTimerAction
  | StartTimerAction
  | StopTimerAction
  | EditTimerAction;
