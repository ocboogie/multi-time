// @flow
import type { Timer } from "../types/Timer";

type AddTimerAction = {
  type: "ADD_TIMER",
  payload: Timer
};
export function addTimer(payload: Timer): AddTimerAction {
  return {
    type: "ADD_TIMER",
    payload
  };
}

type RemoveTimerAction = {
  type: "REMOVE_TIMER",
  payload: Timer | string
};
export function removeTimer(payload: string): RemoveTimerAction {
  return {
    type: "REMOVE_TIMER",
    payload
  };
}

export type TimerAction = AddTimerAction | RemoveTimerAction;
