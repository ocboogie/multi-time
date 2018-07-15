import React, { Component } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faRedo } from "@fortawesome/free-solid-svg-icons/faRedo";

import ActionsContainer from "./ActionsStyles";

export interface Props {
  edit: () => void;
  reset: () => void;
  delete: () => void;
}

export default class Actions extends Component<Props> {
  componentDidMount() {
    // Initialize tooltip
    $(".action-tooltipped").tooltip();
  }

  componentWillUnmount() {
    // Destroy tooltip
    $(".action-tooltipped").tooltip("destroy");
  }

  render() {
    return (
      <ActionsContainer>
        {/* TODO: work on accessibility */}
        {/* eslint-disable jsx-a11y/click-events-have-key-events */}
        <span
          onClick={this.props.edit}
          tabIndex={0}
          role="button"
          className="action-tooltipped"
          data-position="bottom"
          data-delay="25"
          data-tooltip="Edit"
        >
          <FontAwesomeIcon size="lg" icon={faEdit} />
        </span>
        <span
          onClick={this.props.reset}
          tabIndex={0}
          role="button"
          className="action-tooltipped"
          data-position="bottom"
          data-delay="25"
          data-tooltip="Reset"
        >
          <FontAwesomeIcon size="lg" icon={faRedo} />
        </span>
        <span
          onClick={this.props.delete}
          tabIndex={0}
          role="button"
          className="action-tooltipped"
          data-position="bottom"
          data-delay="25"
          data-tooltip="Delete"
        >
          <FontAwesomeIcon size="lg" icon={faTrashAlt} />
        </span>
        {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      </ActionsContainer>
    );
  }
}
