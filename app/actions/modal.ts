import { createAction } from "typesafe-actions";

export interface Modals {
  RESET_CONFIRM: {
    timerId: string;
  };
  DELETE_CONFIRM: {
    timerId: string;
  };
  LOGIN: null;
}

export type ModalTypes = keyof Modals;
export type ModalPayloads = Modals[ModalTypes];

const actions = {
  closeModal: createAction("modal/CLOSE"),
  openModal: createAction(
    "modal/OPEN",
    resolve => (modal: ModalTypes, payload: ModalPayloads) =>
      resolve({ modal, payload })
  )
};

export const displayResetConfirm = (id: string) =>
  actions.openModal("RESET_CONFIRM", { timerId: id });

export const displayDeleteConfirm = (id: string) =>
  actions.openModal("DELETE_CONFIRM", { timerId: id });

export const displayLogin = () => actions.openModal("LOGIN", null);

export default actions;
