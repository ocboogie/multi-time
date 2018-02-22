// @flow
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import type { State } from "./types/State";
import type { Store } from "./types/Store";

// eslint-disable-next-line import/prefer-default-export
export function configureStore(initialState: State): Store {
  const middleware = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Add redux-logger if in development
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { createLogger } = require("redux-logger");

    middleware.push(
      createLogger({
        level: "info",
        collapsed: true
      })
    );
  }

  // Create Store
  const store: Store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
}
