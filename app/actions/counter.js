// @flow
import type { State } from "../reducers";

type IncrementAction = {
  type: "INCREMENT_COUNTER"
};
export function increment(): IncrementAction {
  return {
    type: "INCREMENT_COUNTER"
  };
}

type DecrementAction = {
  type: "DECREMENT_COUNTER"
};
export function decrement(): DecrementAction {
  return {
    type: "DECREMENT_COUNTER"
  };
}

export function incrementIfOdd() {
  return (
    dispatch: (action: IncrementAction) => void,
    getState: () => State
  ) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: (action: IncrementAction) => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export type CounterAction = IncrementAction & DecrementAction;
