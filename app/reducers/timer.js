// @flow
import getElapsed from "../utils/getElapsedTime";
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TimerState = { [string]: Timer };

export default function(state: TimerState = {}, action: Action): TimerState {
  switch (action.type) {
    case "TIMER_ADD":
      return { ...state, [action.payload.timer.id]: action.payload.timer };
    case "TIMER_CLEAR":
      return {};
    case "TIMER_PERM_REMOVE": {
      const { id } = action.payload;
      const editedState = { ...state };
      delete editedState[id];
      return editedState;
    }
    case "TIMER_EDIT": {
      const { id, modification } = action.payload;
      const timer = state[id];
      if (!timer) {
        return { ...state };
      }
      return { ...state, [id]: { ...timer, ...modification } };
    }
    case "TIMER_START": {
      const { id, baseTime, now } = action.payload;
      const timer = { ...state[id] };
      if (!timer) {
        return { ...state };
      }
      timer.timing = {
        baseTime,
        startedAt: now,
        paused: false
      };
      return { ...state, [id]: timer };
    }
    case "TIMER_STOP": {
      const { id } = action.payload;
      const timer = { ...state[id] };
      if (!timer) {
        return { ...state };
      }
      timer.timing = {
        baseTime: getElapsed(timer.timing.baseTime, timer.timing.startedAt),
        paused: true
      };
      return { ...state, [id]: timer };
    }
    case "TIMER_SET_TIMING": {
      const { id, timing } = action.payload;
      const timer = { ...state[id] };
      if (!timer) {
        return { ...state };
      }
      timer.timing = timing;
      return { ...state, [id]: timer };
    }
    case "TIMER_RESET": {
      const { id } = action.payload;
      const timer = { ...state[id] };
      if (!timer) {
        return { ...state };
      }
      timer.timing = {
        baseTime: 0,
        paused: true
      };
      return { ...state, [id]: timer };
    }
    default:
      return state;
  }
}
