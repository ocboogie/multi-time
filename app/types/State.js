// @flow
import type { AuthState } from "../reducers/auth";
import type { ModalState } from "../reducers/modal";
import type { TimerState } from "../reducers/timer";
import type { TrashState } from "../reducers/trash";

export type State = {
  +auth: AuthState,
  +modal: ModalState,
  +timer: TimerState,
  +trash: TrashState
};
