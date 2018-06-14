// @flow

import type { Action } from "../types/Action";

export type AuthState = "loggingin" | "loggedin" | "loggedout";

export default function(
  state: AuthState = "loggedout",
  action: Action
): AuthState {
  switch (action.type) {
    case "AUTH_LOGGINGIN":
      return "loggingin";
    case "AUTH_LOGIN":
      return "loggedin";
    case "AUTH_SIGN_OUT":
      return "loggedout";
    default:
      return state;
  }
}
