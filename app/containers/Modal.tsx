import React, { Component } from "react";
import Materialize from "materialize-css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Dispatch, State } from "../types";
import modalActions from "../actions/modal";

export interface LocalProps {
  close: () => any;
  id: string;
  active: boolean;
}

class Modal extends Component<LocalProps> {
  modalInstance?: Materialize.Modal;

  componentDidMount() {
    this.updateModal();
  }

  componentDidUpdate() {
    this.updateModal();
  }

  updateModal() {
    if (!this.modalInstance) {
      const modal = document.getElementById(this.props.id);
      if (modal === null) {
        return;
      }
      this.modalInstance = Materialize.Modal.init(modal, {
        onCloseEnd: () => {
          if (this.props.active) {
            this.props.close();
          }
        }
      });
    }
    if (this.props.active) {
      this.modalInstance.open();
    } else {
      this.modalInstance.close();
    }
  }

  render() {
    return (
      <div id={this.props.id} className="modal">
        {this.props.children}
      </div>
    );
  }
}

export interface Props {
  id: string;
}

const mapStateToProps = ({ modal }: State, { id }: Props) => ({
  active: modal.active === id
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      close: modalActions.closeModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
