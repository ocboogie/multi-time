import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import rootReducer from "./reducers";
import { Action, State } from "./types";

// eslint-disable-next-line import/prefer-default-export
export default (initialState?: object) => {
  const middleware = [];

  const composeEnhancers =
    /* eslint-disable-next-line no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
  const store = createStore(
    rootReducer,
    initialState!,
    composeEnhancers(
      applyMiddleware(thunk as ThunkMiddleware<State, Action>),
      applyMiddleware(...middleware)
    )
  );

  return store;
};
