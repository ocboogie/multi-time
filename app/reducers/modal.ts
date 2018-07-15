import { ActionType, getType } from "typesafe-actions";

import modal, { ModalPayloads } from "../actions/modal";

export type ModalState = {
  active: "RESET_CONFIRM" | "LOGIN" | null;
  payload: ModalPayloads | null;
};

export type ModalAction = ActionType<typeof modal>;

const state: ModalState = { active: "LOGIN", payload: null };

export default (
  state: ModalState = { active: null, payload: null },
  action: ModalAction
) => {
  switch (action.type) {
    case getType(modal.displayResetConfirmModal):
      return {
        active: "RESET_CONFIRM",
        payload: action.payload
      } as ModalState;
    case getType(modal.displayLoginModal):
      return { active: "LOGIN", payload: null } as ModalState;
    case getType(modal.closeModal):
      return { active: null, payload: null };
    default:
      return state;
  }
};
