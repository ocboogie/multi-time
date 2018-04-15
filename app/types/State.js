// @flow
import type { ModalState } from "../reducers/modal";
import type { TimerState } from "../reducers/timer";
import type { TrashState } from "../reducers/trash";

export type State = {
  +modal: ModalState,
  +timer: TimerState,
  +trash: TrashState
};
