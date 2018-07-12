// @flow
import firebase from "firebase/app";

import { syncTimer } from "./timer";
import type { Dispatch, GetState } from "../types/Store";

let cancelStateSyncer;

type LoginAuthAction = {
  type: "AUTH_LOGIN"
};
export function login() {
  return (dispatch: Dispatch) => {
    dispatch(({ type: "AUTH_LOGIN" }: LoginAuthAction));
  };
}

type SignOutAuthAction = {
  type: "AUTH_SIGN_OUT"
};
export function signOut() {
  return (dispatch: Dispatch, getState: GetState) => {
    if (cancelStateSyncer) {
      cancelStateSyncer();
    }
    if (getState().auth !== "loggedout") {
      firebase.auth().signOut();
    }
    dispatch(
      ({
        type: "AUTH_SIGN_OUT"
      }: SignOutAuthAction)
    );
  };
}

type LoggingInAuthAction = {
  type: "AUTH_LOGGINGIN"
};
export function loggingIn() {
  return (dispatch: Dispatch) => {
    dispatch(
      ({
        type: "AUTH_LOGGINGIN"
      }: LoggingInAuthAction)
    );
    const user = firebase.auth().currentUser;

    if (!user) {
      // TODO: Display login failed
      dispatch(({ type: "AUTH_SIGN_OUT" }: SignOutAuthAction));
      return;
    }
    cancelStateSyncer = window.db
      .collection(`/users/${user.uid}/timers`)
      .onSnapshot(collectionTimers => {
        const timers = Object.create(null);

        collectionTimers.forEach(docTimer => {
          const timer = docTimer.data();
          timers[timer.id] = timer;
        });

        dispatch(syncTimer(timers));
      });
    dispatch(login());
  };
}

export type AuthAction = LoginAuthAction | SignOutAuthAction | LoginAuthAction;
