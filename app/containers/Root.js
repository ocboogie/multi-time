// @flow
import React from "react";
import { Provider } from "react-redux";

import App from "./App";

type Props = {
  store: {}
};

export default (props: Props) => (
  <Provider store={props.store}>
    <App />
  </Provider>
);
