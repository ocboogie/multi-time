// @flow
import { combineReducers } from "redux";
import counter from "./counter";
import type { State as CounterState } from "./counter";

const reducers = {
  counter
};

export type State = {
  +counter: CounterState
};

export default combineReducers(reducers);
