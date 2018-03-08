import React from "react";
import { render } from "react-dom";
import uuid from "uuid/v4";
import "@fortawesome/fontawesome";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import Root from "./containers/Root";
import { configureStore } from "./store";
import { addTimer } from "./actions/timer";
import type { State } from "./types/State";
import type { Store } from "./types/Store";
import "./style";

const state: State = { timer: [] };

const store: Store = configureStore(state);

store.dispatch(addTimer({ time: 0, name: "first", paused: true, id: uuid() }));
store.dispatch(addTimer({ time: 0, name: "second", paused: true, id: uuid() }));
store.dispatch(addTimer({ time: 0, name: "third", paused: true, id: uuid() }));
store.dispatch(addTimer({ time: 0, name: "forth", paused: true, id: uuid() }));
store.dispatch(addTimer({ time: 0, name: "fifth", paused: true, id: uuid() }));

// $FlowFixMe
render(<Root store={store} />, document.getElementById("root"));
