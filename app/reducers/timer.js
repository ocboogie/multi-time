// @flow
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TimerState = Array<Timer>;

export default function(state: TimerState = [], action: Action): TimerState {
  switch (action.type) {
    case "TIMER_ADD":
      return state.concat(action.timer);
    case "TIMER_REMOVE": {
      const { id } = action;
      return state.filter(timer => timer.id !== id);
    }
    case "TIMER_TICK": {
      const { id } = action;
      return state.map(timer => {
        if (timer.id === id) {
          return Object.assign({}, timer, { time: timer.time + 1 });
        }
        return timer;
      });
    }
    case "TIMER_EDIT": {
      const { id, modification } = action;
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
