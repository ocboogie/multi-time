// @flow
import Materialize from "materialize-css";
import $ from "jquery";

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
    dispatch(addTimer(state.trash[state.trash.length - 1], true));
  };
}

type DisplayUndoAction = {
  type: "TRASH_DISPLAY_UNDO"
};
export function displayUndo() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "TRASH_DISPLAY_UNDO"
    });
    const $button = $('<button class="btn-flat toast-action">Undo</button>');
    const $toastContent = $("<span>You deleted a timer</span>").add($button);
    const toast = Materialize.toast($toastContent, 10000);
    $button.click(() => {
      $button.unbind("click");
      toast.remove();
      dispatch(popTrash());
    });
  };
}

export type TrashAction =
  | PopTrashAction
  | AppendTrashAction
  | DisplayUndoAction;
