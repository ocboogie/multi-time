// @flow
import type { Timer } from "../types/Timer";

type AppendTrashAction = {
  type: "TRASH_APPEND",
  timer: Timer
};
export function AppendTrash(timer: Timer): AppendTrashAction {
  return {
    type: "TRASH_APPEND",
    timer
  };
}

type PopTrashAction = {
  type: "TRASH_POP"
};
export function PopTrash(): PopTrashAction {
  return {
    type: "TRASH_POP"
  };
}

export type TrashAction = PopTrashAction | AppendTrashAction;
