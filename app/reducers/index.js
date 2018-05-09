// @flow
import { combineReducers } from "redux";

import loggedIn from "./loggedIn";
import modal from "./modal";
import timer from "./timer";
import trash from "./trash";

export default combineReducers({
  loggedIn,
  modal,
  timer,
  trash
});
