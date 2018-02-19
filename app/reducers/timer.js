// @flow
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TimerState = Array<Timer>;

export default function counter(
  state: TimerState = [],
  action: Action
): TimerState {
  switch (action.type) {
    case "TIMER_ADD":
      return state.concat(action.payload);
    case "TIMER_REMOVE":
      return state.concat(action.payload);
    default:
      return state;
  }
}
