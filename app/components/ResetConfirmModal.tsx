import React, { Component } from "react";
import $ from "jquery";

import { DisplayResetConfirmModalPayload } from "../actions/modal";

export interface Props extends DisplayResetConfirmModalPayload {
  resetTimer: (id: string) => any;
  close: () => any;
}

export default class ResetConfirmModal extends Component<Props> {
  componentDidMount() {
    $("#reset_confirm_modal").modal({
      onCloseEnd: this.props.close
    });
    $("#reset_confirm_modal").modal("open");
  }

  handleYes = () => {
    this.props.resetTimer(this.props.timerId);
  };

  render() {
    return (
      <div id="reset_confirm_modal" className="modal">
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
      </div>
    );
  }
}
