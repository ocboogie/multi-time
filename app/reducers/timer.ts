import { ActionType, getType } from "typesafe-actions";

import timer from "../actions/timer";
import getElapsed from "../utils/getElapsedTime";
import { Timer } from "../types";

export interface TimerState {
  readonly [key: string]: Timer;
}

export type TimerAction = ActionType<typeof timer>;

export default (state: TimerState = {}, action: TimerAction) => {
  switch (action.type) {
    case getType(timer.addTimer):
      return { ...state, [action.payload.timer.id]: action.payload.timer };
    case getType(timer.clearTimer):
      return {};
    case getType(timer.permRemoveTimer): {
      const { id } = action.payload;
      const editedState = { ...state };
      delete editedState[id];
      return editedState;
    }
    case getType(timer.editTimer): {
      const { id, modification } = action.payload;
      const timer = state[id];
      if (!timer) {
        return { ...state };
      }
      return { ...state, [id]: { ...timer, ...modification } };
    }
    case getType(timer.startTimer): {
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
    case getType(timer.stopTimer): {
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
    case getType(timer.setTimingTimer): {
      const { id, timing } = action.payload;
      const timer = { ...state[id] };
      if (!timer) {
        return { ...state };
      }
      timer.timing = timing;
      return { ...state, [id]: timer };
    }
    case getType(timer.resetTimer): {
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
};
