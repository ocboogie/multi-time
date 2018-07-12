// @flow
import React from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";

import type { State } from "../types/State";
import type { ModalPayloads } from "../actions/modal";

const LoadableResetConfirmModal = Loadable({
  loader: () => import("./ResetConfirmModal"),
  loading: () => null
});
const LoadableLoginModal = Loadable({
  loader: () => import("./LoginModal"),
  loading: () => null
});

type Props = {|
  activeModal: string,
  payload: ModalPayloads
|};

const Modals = (props: Props) => {
  let CurrentModal;
  switch (props.activeModal) {
    case "RESET_CONFIRM":
      CurrentModal = LoadableResetConfirmModal;
      break;
    case "LOGIN":
      CurrentModal = LoadableLoginModal;
      break;
    default:
      return null;
  }
  return <CurrentModal {...props.payload} />;
};

const mapStateToProps = ({ modal }: State) => ({
  activeModal: modal.active,
  payload: modal.payload
});

export default connect(mapStateToProps)(Modals);
