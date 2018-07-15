import firebase from "firebase/app";
import { createAction, ActionType } from "typesafe-actions";

import { ThunkAction } from "../types";
import { syncTimer } from "./timer";

let cancelStateSyncer: () => void;

const actions = {
  login: createAction("auth/LOGIN"),
  signOut: createAction("auth/SIGN_OUT"),
  loggingIn: createAction("auth/LOGGINGIN")
};

export const signOut = (): ThunkAction<void> => (dispatch, getState) => {
  if (cancelStateSyncer) {
    cancelStateSyncer();
  }
  if ((getState().auth as string) !== "signedout") {
    firebase.auth().signOut();
  }
  dispatch(actions.signOut());
};

export const loggingIn = (): ThunkAction<void> => {
  return dispatch => {
    dispatch(actions.loggingIn());
    const user = firebase.auth().currentUser;

    if (!user) {
      // TODO: Display login failed
      dispatch(signOut());
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
    dispatch(actions.login());
  };
};

export default actions;
