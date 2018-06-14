// @flow
import React from "react";
import { render } from "react-dom";
import momentDurationFormatSetup from "moment-duration-format";
import moment from "moment";
import firebase from "firebase";
import "firebase/firestore";
import "@fortawesome/fontawesome";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import Root from "./containers/Root";
import { configureStore } from "./store";
import { loggingIn, signOut } from "./actions/auth";
import type { Store } from "./types/Store";
import "./style";

const store: Store = configureStore();

momentDurationFormatSetup(moment);

firebase.initializeApp({
  apiKey: "AIzaSyDhN_yry9YrbAbarNYs3X_4TTdjjevs_Ck",
  authDomain: "multi-time.firebaseapp.com",
  databaseURL: "https://multi-time.firebaseio.com",
  projectId: "multi-time",
  storageBucket: "multi-time.appspot.com",
  messagingSenderId: "924179901209"
});

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

window.db = db;

// $FlowFixMe
render(<Root store={store} />, document.getElementById("root"));

firebase.auth().onAuthStateChanged(user => {
  const state = store.getState();
  if (user) {
    if (state.auth !== "loggingin") {
      store.dispatch(loggingIn());
    }
  } else if (state.auth !== "loggedout") {
    store.dispatch(signOut());
  }
});
