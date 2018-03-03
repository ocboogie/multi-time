// @flow
import type { Timer, ModTimer } from "../types/Timer";
import type { Dispatch, GetState } from "../types/Store";
import { AppendTrash } from "./trash";

type AddTimerAction = {
  type: "TIMER_ADD",
  timer: Timer
};
export function addTimer(timer: Timer): AddTimerAction {
  return {
    type: "TIMER_ADD",
    timer
  };
}

type RemoveTimerAction = {
  type: "TIMER_REMOVE",
  id: string
};
export function removeTimer(id: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    const timer = state.timer[id];
    if (!timer) {
      return;
    }
    dispatch({
      type: "TIMER_REMOVE",
      id
    });
    dispatch(AppendTrash(timer));
    dispatch({
      type: "TIMER_PERM_REMOVE",
      id
    });
  };
}

type PermRemoveTimerAction = {
  type: "TIMER_PERM_REMOVE",
  id: string
};
export function permRemoveTimer(id: string): PermRemoveTimerAction {
  return {
    type: "TIMER_PERM_REMOVE",
    id
  };
}

type TickTimerAction = {
  type: "TIMER_TICK",
  id: string
};
export function tickTimer(id: string): TickTimerAction {
  return {
    type: "TIMER_TICK",
    id
  };
}

const timers = Object.create(null);
type StartTimerAction = {
  type: "TIMER_START",
  id: string
};
export function startTimer(id: string) {
  return (dispatch: Dispatch) => {
    clearInterval(timers[id]);
    timers[id] = setInterval(() => dispatch(tickTimer(id)), 1000);
    dispatch({
      type: "TIMER_START",
      id
    });
    dispatch(tickTimer(id));
  };
}

type StopTimerAction = {
  type: "TIMER_STOP",
  id: string
};
export function stopTimer(id: string) {
  return (dispatch: Dispatch) => {
    clearInterval(timers[id]);
    dispatch({
      type: "TIMER_STOP",
      id
    });
  };
}

type EditTimerAction = {
  type: "TIMER_EDIT",
  id: string,
  modification: ModTimer
};
export function editTimer(id: string, modification: ModTimer): EditTimerAction {
  return {
    type: "TIMER_EDIT",
    id,
    modification
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
  | RemoveTimerAction
  | PermRemoveTimerAction
  | TickTimerAction
  | StartTimerAction
  | StopTimerAction
  | EditTimerAction;
