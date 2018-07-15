import React from "react";
import { connect } from "react-redux";

import { State } from "../types";
import { ModalState } from "../reducers/modal";
import { ModalPayloads } from "../actions/modal";
import ResetConfirmModal from "./ResetConfirmModal";
import LoginModal from "./LoginModal";

export type Props = ModalState;

const Modals = (props: Props) => {
  let CurrentModal;
  switch (props.active) {
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
  active: modal.active,
  payload: modal.payload
});

export default connect(mapStateToProps)(Modals);
