import Materialize from "materialize-css";
import $ from "jquery";
import { createAction, ActionType } from "typesafe-actions";

import { addTimer } from "./timer";
import { Timer, ThunkAction } from "../types";

const actions = {
  appendTrash: createAction("trash/APPEND", resolve => (timer: Timer) =>
    resolve({ timer })
  ),
  popTrash: createAction("trash/POP"),
  displayUndo: createAction("trash/DISPLAY_UNDO")
};

export const popTrash = (): ThunkAction<void> => (dispatch, getState) => {
  const state = getState();
  dispatch(actions.popTrash);
  dispatch(addTimer(state.trash[state.trash.length - 1], true));
};

export const displayUndo = (): ThunkAction<void> => dispatch => {
  dispatch(actions.displayUndo());
  // const $button = $('<button class="btn-flat toast-action">Undo</button>');
  // const $toastContent = $("<span>You deleted a timer</span>").add($button);
  // const toast = Materialize.toast($toastContent, 10000);
  // $button.click(() => {
  //   $button.unbind("click");
  //   toast.remove();
  //   dispatch(popTrash());
  // });
};

export default actions;
