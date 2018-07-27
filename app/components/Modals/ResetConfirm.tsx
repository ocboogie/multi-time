import React, { Component } from "react";
import Materialize from "materialize-css";

import { Modals } from "../../actions/modal";
import Modal from "../../containers/Modal";

export type Props = {
  resetTimer: (id: string) => any;
} & Modals["RESET_CONFIRM"];

export default class ResetConfirmModal extends Component<Props> {
  handleYes = () => {
    this.props.resetTimer(this.props.timerId);
  };

  render() {
    return (
      <Modal id="RESET_CONFIRM">
        <div className="modal-content">
          <h4>Reset timer</h4>
          <p>Are you sure you want to reset this timer?</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={this.handleYes}
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            Yes
          </a>
          <a
            href="#!"
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >
            No
          </a>
        </div>
      </Modal>
    );
  }
}
