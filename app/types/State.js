// @flow
import type { TimerState } from "../reducers/timer";
import type { TrashState } from "../reducers/trash";

export type State = {
  +timer: TimerState,
  +trash: TrashState
};
