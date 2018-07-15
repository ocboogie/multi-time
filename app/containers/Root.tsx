import React from "react";
import { Provider } from "react-redux";

import { Store } from "../types";
import App from "./App";

interface Props {
  store: Store;
}

const Root = (props: Props) => (
  <Provider store={props.store}>
    <App />
  </Provider>
);

Root.displayName = "Root";

export default Root;
