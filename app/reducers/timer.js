// @flow
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TimerState = Array<Timer>;

export default function(state: TimerState = [], action: Action): TimerState {
  switch (action.type) {
    case "TIMER_ADD":
      return state.concat(action.payload);
    case "TIMER_REMOVE":
      return state.filter(timer => timer.id !== action.payload);
    case "TIMER_TICK":
      return state.map(timer => {
        if (timer.id === action.payload) {
          return Object.assign({}, timer, { timer: timer.time + 1 });
        }
        return timer;
      });
    case "TIMER_EDIT": {
      const { id, modification } = action.payload;
      return state.map(timer => {
        if (timer.id === id) {
          return Object.assign({}, timer, modification);
        }
        return timer;
      });
    }
    default:
      return state;
  }
}
