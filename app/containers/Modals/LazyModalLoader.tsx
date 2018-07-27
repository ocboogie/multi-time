import React from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";

import { State } from "../../types";
import { ModalState } from "../../reducers/modal";
import { ModalTypes } from "../../actions/modal";
import ResetConfirmModal from "./ResetConfirmModal";
import LoginModal from "./LoginModal";

export type Props = ModalState;

type ModalMap = { [M in ModalTypes]: React.ComponentClass<any> };

const modals: ModalMap = {
  RESET_CONFIRM: ResetConfirmModal,
  LOGIN: LoginModal
};

const renderedModals: Partial<
  { [M in ModalTypes]: JSX.Element }
> = Object.create(null);

const ModalManager = (props: Props) => {
  for (const [key, Modal] of Object.entries(modals)) {
    if (key === props.active) {
      renderedModals[key] = <Modal {...props.payload} />;
      break;
    }
  }
  return <>{Object.values(renderedModals)}</>;
};

const mapStateToProps = ({ modal }: State) => ({
  active: modal.active,
  payload: modal.payload
});

export default connect(mapStateToProps)(ModalManager);
