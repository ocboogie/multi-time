// @flow
import type { Timer } from "../types/Timer";

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

export type TimerAction = AddTimerAction | RemoveTimerAction;
