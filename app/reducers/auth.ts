import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";

import authActions from "../actions/auth";

export interface SignedoutState {
  id: null;
  stage: "signedout";
}

export interface LogginginState {
  id: null;
  stage: "loggingin";
}

export interface LoggedinState {
  id: string;
  stage: "loggedin";
}

export type AuthState = SignedoutState | LogginginState | LoggedinState;

export type AuthAction = ActionType<typeof authActions>;

export default ((
  state: AuthState = { id: null, stage: "signedout" },
  action: AuthAction
) => {
  switch (action.type) {
    case getType(authActions.signOut):
      return {
        id: null,
        stage: "signedout"
      };
    case getType(authActions.loggingIn):
      return {
        id: null,
        stage: "loggingin"
      };
    case getType(authActions.login):
      return {
        id: action.payload.id,
        stage: "loggedin"
      };
    default:
      return state;
  }
}) as Reducer<AuthState, AuthAction>;
