// @flow

import type { Action } from "../types/Action";

export type LoggedInState = "loggingin" | "loggedin" | "loggedout";

export default function(
  state: LoggedInState = "loggedout",
  action: Action
): LoggedInState {
  switch (action.type) {
    case "LOGGEDIN_LOGGINGIN":
      return "loggingin";
    case "LOGGEDIN_LOGIN":
      return "loggedin";
    case "LOGGEDIN_SIGN_OUT":
      return "loggedout";
    default:
      return state;
  }
}
