// @flow
import type { Timer, ModTimer } from "../types/Timer";
import type { Dispatch } from "../types/Store";

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
export function removeTimer(id: string): RemoveTimerAction {
  return {
    type: "TIMER_REMOVE",
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
  clearInterval(timers[id]);
  return (dispatch: Dispatch) => {
    clearInterval(timers[id]);
    dispatch({
      type: "TIMER_STOP",
      id
    });
    dispatch(tickTimer(id));
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

export type TimerAction =
  | AddTimerAction
  | RemoveTimerAction
  | TickTimerAction
  | StartTimerAction
  | StopTimerAction
  | EditTimerAction;
