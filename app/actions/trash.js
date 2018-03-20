// @flow
import { addTimer } from "./timer";
import type { Timer } from "../types/Timer";
import type { Dispatch, GetState } from "../types/Store";

type AppendTrashAction = {
  type: "TRASH_APPEND",
  payload: { timer: Timer }
};
export function appendTrash(timer: Timer): AppendTrashAction {
  return {
    type: "TRASH_APPEND",
    payload: { timer }
  };
}

type PopTrashAction = {
  type: "TRASH_POP"
};
export function popTrash() {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    dispatch({
      type: "TRASH_POP"
    });
    dispatch(addTimer(state.trash[state.trash.length - 1]));
  };
}

export type TrashAction = PopTrashAction | AppendTrashAction;
