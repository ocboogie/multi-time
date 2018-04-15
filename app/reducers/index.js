// @flow
import { combineReducers } from "redux";

import modal from "./modal";
import timer from "./timer";
import trash from "./trash";

export default combineReducers({
  modal,
  timer,
  trash
});
