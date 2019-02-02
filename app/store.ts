import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import rootReducer from "./reducers";
import { Action, State } from "./types";

export default (initialState?: object) => {
  const middleware = [];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Add redux-logger if in development
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
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
    rootReducer, // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    initialState!,
    composeEnhancers(
      applyMiddleware(thunk as ThunkMiddleware<State, Action>),
      applyMiddleware(...middleware)
    )
  );

  return store;
};
