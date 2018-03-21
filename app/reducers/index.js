// @flow
import { combineReducers } from "redux";

import timer from "./timer";
import trash from "./trash";

export default combineReducers({
  timer,
  trash
});
