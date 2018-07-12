type CloseModalAction = {
  type: "MODAL_CLOSE"
};
export function closeModal(): CloseModalAction {
  return {
    type: "MODAL_CLOSE"
  };
}

export type DisplayResetConfirmModalPayload = {
  timerId: string
};
type DisplayResetConfirmModalAction = {
  type: "MODAL_DISPLAY_RESET_CONFIRM",
  payload: DisplayResetConfirmModalPayload
};
export function displayResetConfirmModal(
  timerId: string
): DisplayResetConfirmModalAction {
  return {
    type: "MODAL_DISPLAY_RESET_CONFIRM",
    payload: {
      timerId
    }
  };
}

type DisplayLoginModalAction = {
  type: "MODAL_DISPLAY_LOGIN"
};
export function displayLoginModal(): DisplayLoginModalAction {
  return {
    type: "MODAL_DISPLAY_LOGIN"
  };
}

export type ModalAction =
  | DisplayResetConfirmModalAction
  | DisplayLoginModalAction;
export type ModalPayloads = DisplayResetConfirmModalPayload;
