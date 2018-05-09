// @flow
import firebase from "firebase";

import { generateTimer } from "./timer";
import timer2dbTimer from "../utils/timer2dbTimer";
import type { Dispatch, GetState } from "../types/Store";

// eslint-disable-next-line no-undef
let uploadInterval: IntervalID;

type LoginLoggedInAction = {
  type: "LOGGEDIN_LOGIN"
};
export function login() {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(({ type: "LOGGEDIN_LOGIN" }: LoginLoggedInAction));
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

type SignOutLoggedInAction = {
  type: "LOGGEDIN_SIGN_OUT"
};
export function signOut(): SignOutLoggedInAction {
  clearInterval(uploadInterval);
  return {
    type: "LOGGEDIN_SIGN_OUT"
  };
}

type LoginLoggingInAction = {
  type: "LOGGEDIN_LOGGINGIN"
};
export function loggingIn() {
  return (dispatch: Dispatch) => {
    dispatch(
      ({
        type: "LOGGEDIN_LOGGINGIN"
      }: LoginLoggingInAction)
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

export type LoggedInAction =
  | LoginLoggedInAction
  | SignOutLoggedInAction
  | LoginLoggingInAction;
