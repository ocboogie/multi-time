// @flow
import type { authState } from "../reducers/auth";
import type { ModalState } from "../reducers/modal";
import type { TimerState } from "../reducers/timer";
import type { TrashState } from "../reducers/trash";

export type State = {
  +auth: authState,
  +modal: ModalState,
  +timer: TimerState,
  +trash: TrashState
};
