import React, { Component } from "react";

import { Modals } from "../../actions/modal";
import Modal from "../../containers/Modal";

export type Props = {
  removeTimer: (id: string) => any;
} & Modals["DELETE_CONFIRM"];

export default class DeleteConfirmModal extends Component<Props> {
  handleYes = () => {
    this.props.removeTimer(this.props.timerId);
  };

  render() {
    return (
      <Modal id="DELETE_CONFIRM">
        <div className="modal-content">
          <h4>Delete timer</h4>
          <p>Are you sure you want to delete this timer?</p>
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
