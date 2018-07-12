// @flow
import React from "react";
import { connect } from "react-redux";

import ResetConfirmModal from "./ResetConfirmModal";
import LoginModal from "./LoginModal";
import type { State } from "../types/State";
import type { ModalPayloads } from "../actions/modal";

type Props = {|
  activeModal: string,
  payload: ModalPayloads
|};

const Modals = (props: Props) => {
  let CurrentModal;
  switch (props.activeModal) {
    case "RESET_CONFIRM":
      CurrentModal = ResetConfirmModal;
      break;
    case "LOGIN":
      CurrentModal = LoginModal;
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
