import { ActionType, getType } from "typesafe-actions";

import authActions, { loggingIn } from "../actions/auth";

export type AuthState = "loggingin" | "loggedin" | "signedout";

export type AuthAction = ActionType<typeof authActions>;

export default (state: AuthState = "signedout", action: AuthAction) => {
  switch (action.type) {
    case getType(authActions.loggingIn):
      return "loggingin";
    case getType(authActions.login):
      return "loggedin";
    case getType(authActions.signOut):
      return "signedout";
    default:
      return state;
  }
};
