// @flow
import type { LoggedInAction } from "../actions/loggedIn";
import type { ModalAction } from "../actions/modal";
import type { TimerAction } from "../actions/timer";
import type { TrashAction } from "../actions/trash";

export type Action = LoggedInAction | ModalAction | TimerAction | TrashAction;
