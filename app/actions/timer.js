// @flow
import type { Timer, ModTimer } from "../types/Timer";
import type { Dispatch } from "../types/Store";

type AddTimerAction = {
  type: "TIMER_ADD",
  payload: Timer
};
export function addTimer(payload: Timer): AddTimerAction {
  return {
    type: "TIMER_ADD",
    payload
  };
}

type RemoveTimerAction = {
  type: "TIMER_REMOVE",
  payload: string
};
export function removeTimer(id: string): RemoveTimerAction {
  return {
    type: "TIMER_REMOVE",
    payload: id
  };
}

type TickTimerAction = {
  type: "TIMER_TICK",
  payload: string
};
export function tickTimer(id: string): TickTimerAction {
  return {
    type: "TIMER_TICK",
    payload: id
  };
}

const timers = Object.create(null);
type StartTimerAction = {
  type: "TIMER_START",
  payload: string
};
export function startTimer(id: string) {
  return (dispatch: Dispatch) => {
    clearInterval(timers[id]);
    timers[id] = setInterval(() => dispatch(tickTimer(id)), 1000);
    dispatch({
      type: "TIMER_START",
      payload: id
    });
    dispatch(tickTimer(id));
  };
}

type StopTimerAction = {
  type: "TIMER_STOP",
  payload: string
};
export function stopTimer(id: string) {
  clearInterval(timers[id]);
  return (dispatch: Dispatch) => {
    clearInterval(timers[id]);
    dispatch({
      type: "TIMER_STOP",
      payload: id
    });
    dispatch(tickTimer(id));
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

export type TimerAction =
  | AddTimerAction
  | RemoveTimerAction
  | TickTimerAction
  | StartTimerAction
  | StopTimerAction
  | EditTimerAction;
