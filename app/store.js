// @flow
import { createStore, applyMiddleware } from "redux";
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import type { Action } from "./actions";
import type { State } from "./reducers";

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;

// eslint-disable-next-line no-use-before-define
export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

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
    applyMiddleware(thunk)
  );

  return store;
}
