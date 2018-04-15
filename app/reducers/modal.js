// @flow

import type { Action } from "../types/Action";
import type { ModalPayloads } from "../actions/modal";

export type ModalState = {
  active: "RESET_CONFIRM" | null,
  payload: ModalPayloads | null
};

export default function(
  state: ModalState = { active: null, payload: null },
  action: Action
): ModalState {
  switch (action.type) {
    case "MODAL_DISPLAY_RESET_CONFIRM":
      return { active: "RESET_CONFIRM", payload: action.payload };
    case "MODAL_CLOSE":
      return { active: null, payload: null };
    default:
      return state;
  }
}
