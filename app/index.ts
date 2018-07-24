import "core-js";
import React from "react";
import { render } from "react-dom";
import { compose } from "redux";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "@fortawesome/fontawesome";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import Root from "./containers/Root";
import configureStore from "./store";
import { loggingIn, signOut } from "./actions/auth";
import "./style";

const store = configureStore();

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

// eslint-disable-next-line typescript/prefer-namespace-keyword
declare global {
  interface Window {
    db: firebase.firestore.Firestore;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
  interface Function {
    displayName: string;
  }
}

render(React.createElement(Root, { store }), document.getElementById("root"));

firebase.auth().onAuthStateChanged(user => {
  const state = store.getState();
  if (user) {
    if (state.auth.stage !== "loggingin") {
      store.dispatch(loggingIn());
    }
  } else if (state.auth.stage !== "signedout") {
    store.dispatch(signOut());
  }
});
