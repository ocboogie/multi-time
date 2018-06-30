// @flow
import React, { Component } from "react";
import $ from "jquery";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { closeModal } from "../actions/modal";
import { resetTimer } from "../actions/timer";
import type { DisplayResetConfirmModalPayload } from "../actions/modal";
import type { State } from "../types/State";
import type { Dispatch } from "../types/Store";

type Props = {|
  active: boolean,
  payload: DisplayResetConfirmModalPayload,
  resetTimer: (id: string) => void,
  close: () => void
|};

class ResetConfirmModal extends Component<Props> {
  componentDidMount() {
    // $FlowIssue
    $("#reset_confirm_modal").modal({
      complete: this.props.close
    });
  }

  componentDidUpdate() {
    if (this.props.active) {
      // $FlowIssue
      $("#reset_confirm_modal").modal("open");
    } else {
      // $FlowIssue
      $("#reset_confirm_modal").modal("close");
    }
  }

  handleYes = () => {
    this.props.resetTimer(this.props.payload.timerId);
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

const mapStateToProps = ({ modal }: State) => ({
  active: modal.active === "RESET_CONFIRM",
  payload: modal.payload
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      resetTimer,
      close: closeModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetConfirmModal);
