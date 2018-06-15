// @flow
import firebase from "firebase";

import { generateTimer } from "./timer";
import timer2dbTimer from "../utils/timer2dbTimer";
import type { Dispatch, GetState } from "../types/Store";

// eslint-disable-next-line no-undef
let uploadInterval: IntervalID;

type LoginAuthAction = {
  type: "AUTH_LOGIN"
};
export function login() {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(({ type: "AUTH_LOGIN" }: LoginAuthAction));
    const user = firebase.auth().currentUser;
    uploadInterval = setInterval(() => {
      Object.values(getState().timer).forEach(timer => {
        window.db // $FlowIssue
          .doc(`/users/${user.uid}/timers/${timer.id}`)
          .set(timer2dbTimer(timer));
      });
    }, 5000);
  };
}

type SignOutAuthAction = {
  type: "AUTH_SIGN_OUT"
};
export function signOut() {
  return (dispatch: Dispatch, getState: GetState) => {
    clearInterval(uploadInterval);
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

    window.db
      .collection(`/users/${user.uid}/timers`)
      .get()
      .then(timers => {
        timers.forEach(docTimer => {
          const timer = docTimer.data();
          dispatch(
            generateTimer({
              name: timer.name,
              id: timer.id,
              timing: { paused: true, baseTime: timer.elapsed }
            })
          );
        });
        dispatch(login());
      });
  };
}

export type AuthAction = LoginAuthAction | SignOutAuthAction | LoginAuthAction;
