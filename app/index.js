// @flow
import React from "react";
import { render } from "react-dom";
import "materialize-css";

import Root from "./containers/Root";
import { configureStore } from "./store";
import type { State } from "./reducers";
import "./styles.global.scss";

const state: State = { counter: 1 };

const store = configureStore(state);

// $FlowFixMe
render(<Root store={store} />, document.getElementById("root"));
