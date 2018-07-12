// @flow
import React, { Component } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faRedo } from "@fortawesome/free-solid-svg-icons/faRedo";

import ActionsContainer from "./ActionsStyles";

export type Props = {|
  edit: () => void,
  reset: () => void,
  delete: () => void
|};

export default class Actions extends Component<Props> {
  componentDidMount() {
    // Initialize tooltip
    // $FlowFixMe
    $(".action-tooltipped").tooltip();
  }

  componentWillUnmount() {
    // Destroy tooltip
    // $FlowFixMe
    $(".action-tooltipped").tooltip("destroy");
  }

  render() {
    return (
      <ActionsContainer>
        <FontAwesomeIcon
          onClick={this.props.edit}
          className="action-tooltipped"
          data-position="bottom"
          data-delay="25"
          data-tooltip="Edit"
          size="lg"
          icon={faEdit}
        />
        <FontAwesomeIcon
          onClick={this.props.reset}
          className="action-tooltipped"
          data-position="bottom"
          data-delay="25"
          data-tooltip="Reset"
          size="lg"
          icon={faRedo}
        />
        <FontAwesomeIcon
          onClick={this.props.delete}
          className="action-tooltipped"
          data-position="bottom"
          data-delay="25"
          data-tooltip="Delete"
          size="lg"
          icon={faTrashAlt}
        />
      </ActionsContainer>
    );
  }
}
