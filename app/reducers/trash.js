// @flow
import type { Action } from "../types/Action";
import type { Timer } from "../types/Timer";

export type TrashState = Array<Timer>;

export default function(state: TrashState = [], action: Action): TrashState {
  switch (action.type) {
    case "TRASH_APPEND":
      return state.concat(action.payload.timer);
    case "TRASH_POP":
      return state.slice(0, -1);
    default:
      return state;
  }
}
