import { ThunkAction as ReduxThunkAction, ThunkDispatch } from "redux-thunk";
import { StateType } from "typesafe-actions";

import { AuthAction } from "./reducers/auth";
import { ModalAction } from "./reducers/modal";
import { TimerAction } from "./reducers/timer";
import { TrashAction } from "./reducers/trash";
import rootReducer from "./reducers";
import configureStore from "./store";

export type State = StateType<typeof rootReducer>;
export type Action = AuthAction | ModalAction | TimerAction | TrashAction;
export type ThunkAction<R> = ReduxThunkAction<R, State, undefined, Action>;
export type Dispatch = ThunkDispatch<State, undefined, Action>;
export type Store = ReturnType<typeof configureStore>;

export interface Timing {
  startedAt?: number;
  baseTime: number;
  paused: boolean;
}

export interface Timer {
  name: string | null;
  id: string;
  timing: Timing;
}

export type ModTimer = Partial<Timer>;
