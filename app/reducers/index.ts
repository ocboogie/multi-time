import { combineReducers, Reducer } from "redux";

import auth from "./auth";
import modal from "./modal";
import timer from "./timer";

export default combineReducers({
  auth,
  modal,
  timer
});
