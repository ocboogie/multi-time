import React from "react";
import { render } from "react-dom";
import uuid from "uuid/v4";
import "@fortawesome/fontawesome";
import "web-animations-js";
import "hammerjs";
import "materialize-css";

import Root from "./containers/Root";
import { configureStore } from "./store";
import { addTimer } from "./actions/timer";
import type { State } from "./types/State";
import "./muuriHack";
import "./styles.global.scss";

const state: State = { timer: [] };

const store = configureStore(state);

store.dispatch(
  addTimer({ position: 0, time: 0, name: "first", paused: false, id: uuid() })
);
store.dispatch(
  addTimer({ position: 1, time: 0, name: "second", paused: false, id: uuid() })
);

// $FlowFixMe
render(<Root store={store} />, document.getElementById("root"));
