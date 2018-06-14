// @flow
import { combineReducers } from "redux";

import auth from "./auth";
import modal from "./modal";
import timer from "./timer";
import trash from "./trash";

export default combineReducers({
  auth,
  modal,
  timer,
  trash
});
