import React from "react";
import { Provider } from "react-redux";

import { Store } from "../types";
import App from "./App";

interface Props {
  store: Store;
}

export default (props: Props) => (
  <Provider store={props.store}>
    <App />
  </Provider>
);
