// @flow
import type { LoggedInState } from "../reducers/loggedIn";
import type { ModalState } from "../reducers/modal";
import type { TimerState } from "../reducers/timer";
import type { TrashState } from "../reducers/trash";

export type State = {
  +loggedIn: LoggedInState,
  +modal: ModalState,
  +timer: TimerState,
  +trash: TrashState
};
