// @flow
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TimerState = { [string]: Timer };

export default function(state: TimerState = {}, action: Action): TimerState {
  switch (action.type) {
    case "TIMER_ADD":
      return { ...state, [action.payload.timer.id]: action.payload.timer };
    case "TIMER_PERM_REMOVE": {
      const { id } = action.payload;
      const editedState = { ...state };
      delete editedState[id];
      return editedState;
    }
    case "TIMER_EDIT": {
      const { id, modification } = action.payload;
      const editedState = { ...state };
      const timer = editedState[id];
      if (timer) {
        Object.assign(timer, modification);
      }
      return editedState;
    }
    case "TIMER_START": {
      const { id, baseTime, now } = action.payload;
      const editedState = { ...state };
      const timer = editedState[id];
      if (timer) {
        timer.timing = {
          baseTime,
          startedAt: now,
          paused: false
        };
      }
      return editedState;
    }
    case "TIMER_STOP": {
      const { id, now } = action.payload;
      const editedState = { ...state };
      const timer = editedState[id];
      if (timer) {
        Object.assign(timer.timing, {
          stoppedAt: now,
          paused: true
        });
      }
      return editedState;
    }
    case "TIMER_RESET": {
      const { id, now } = action.payload;
      const editedState = { ...state };
      const timer = editedState[id];
      if (timer) {
        timer.timing = {
          baseTime: 0,
          startedAt: timer.timing.startedAt ? now : undefined,
          stoppedAt: timer.timing.stoppedAt ? now : undefined
        };
      }
      return editedState;
    }
    default:
      return state;
  }
}
