import React from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";

import { State } from "../../types";
import { ModalState } from "../../reducers/modal";
import { ModalTypes } from "../../actions/modal";
import DeleteConfirm from "./DeleteConfirm";
import ResetConfirm from "./ResetConfirm";
import Login from "./Login";

export type Props = ModalState;

type ModalMap = { [M in ModalTypes]: React.ComponentClass<any> };

const modals: ModalMap = {
  RESET_CONFIRM: ResetConfirm,
  DELETE_CONFIRM: DeleteConfirm,
  LOGIN: Login
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
