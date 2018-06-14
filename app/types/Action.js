// @flow
import type { AuthAction } from "../actions/auth";
import type { ModalAction } from "../actions/modal";
import type { TimerAction } from "../actions/timer";
import type { TrashAction } from "../actions/trash";

export type Action = AuthAction | ModalAction | TimerAction | TrashAction;
