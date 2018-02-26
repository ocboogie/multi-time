// @flow
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TimerState = { [string]: Timer };

export default function(state: TimerState = {}, action: Action): TimerState {
  switch (action.type) {
    case "TIMER_ADD":
      return { ...state, [action.timer.id]: action.timer };
    case "TIMER_REMOVE": {
      const { id } = action;
      return { ...state, [id]: undefined };
    }
    case "TIMER_TICK": {
      const { id } = action;
      const tickedState = { ...state };
      const timer = tickedState[id];
      if (timer) {
        timer.time += 1;
      }
      // Once I can use optional chaining:
      // tickedState[id]?.time += 1;
      return tickedState;
    }
    case "TIMER_EDIT": {
      const { id, modification } = action;
      const editedState = { ...state };
      const timer = editedState[id];
      if (timer) {
        editedState[id] = Object.assign(timer, modification);
      }
      return editedState;
    }
    default:
      return state;
  }
}
