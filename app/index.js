import React from "react";
import { render } from "react-dom";
import "@fortawesome/fontawesome";
import "web-animations-js";
import "hammerjs";
import "materialize-css";

import Root from "./containers/Root";
import { configureStore } from "./store";
import type { State } from "./types/State";
import "./styles.global.scss";

const state: State = { timer: [] };

const store = configureStore(state);

// $FlowFixMe
render(<Root store={store} />, document.getElementById("root"));
