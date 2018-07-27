import { Reducer } from "redux";
import { ActionType, getType } from "typesafe-actions";

import modal, { Modals } from "../actions/modal";

export interface ModalState<T extends keyof Modals = keyof Modals> {
  active: T | null;
  payload: Modals[T] | null;
}

export type ModalAction = ActionType<typeof modal>;

export default (
  state: ModalState = { active: null, payload: null },
  action: ModalAction
) => {
  switch (action.type) {
    case getType(modal.closeModal):
      return { active: null, payload: null };
    case getType(modal.openModal):
      return { active: action.payload.modal, payload: action.payload.payload };
    default:
      return state;
  }
};
