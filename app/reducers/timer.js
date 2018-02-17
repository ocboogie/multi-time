// @flow
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TimerState = Array<Timer>;

export default function counter(
  state: TimerState = [],
  action: Action
): TimerState {
  switch (action.type) {
    case "ADD_TIMER":
      return state.concat(action.payload);
    case "REMOVE_TIMER":
      return state.concat(action.payload);
    default:
      return state;
  }
}
