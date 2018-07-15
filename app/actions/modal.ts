import { createAction, ActionType } from "typesafe-actions";

const actions = {
  closeModal: createAction("modal/CLOSE"),
  displayResetConfirmModal: createAction(
    "modal/DISPLAY_RESET_CONFIRM",
    resolve => (timerId: string) => resolve({ timerId })
  ),
  displayLoginModal: createAction("modal/DISPLAY_LOGIN")
};

export interface DisplayResetConfirmModalPayload {
  timerId: string;
}

export type ModalPayloads = DisplayResetConfirmModalPayload;

export default actions;
