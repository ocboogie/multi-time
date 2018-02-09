// @flow
import type { Action } from "../actions";

export type State = number;

export default function counter(state: State = 0, action: Action): State {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return state + 1;
    case "DECREMENT_COUNTER":
      return state - 1;
    default:
      return state;
  }
}
