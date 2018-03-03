// @flow
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from "redux";

import type { Action } from "./Action";
import type { State } from "./State";

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;

// eslint-disable-next-line no-use-before-define
export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;

export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => any;
