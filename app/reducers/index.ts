import { ActionType, StateType, getType, createAction } from "typesafe-actions";
import { combineReducers, Reducer } from "redux";

import auth from "./auth";
import modal from "./modal";
import timer from "./timer";
import trash from "./trash";

const actions = {
  increment: createAction("increment")
};

export type TodosAction = ActionType<typeof actions>;

export type State = number;

export default combineReducers({
  auth,
  modal,
  timer,
  trash
});
