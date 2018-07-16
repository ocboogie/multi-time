import React, { Component } from "react";
import Materialize from "materialize-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faRedo } from "@fortawesome/free-solid-svg-icons/faRedo";

import ActionsContainer, { Action } from "./ActionsStyles";

export interface Props {
  edit: () => void;
  reset: () => void;
  delete: () => void;
  className?: string;
}

export default class Actions extends Component<Props> {
  tooltips?: Materialize.Tooltip[];

  componentDidMount() {
    // Initialize tooltip
    const tooltips = document.querySelectorAll(".action-tooltipped");
    this.tooltips = Materialize.Tooltip.init(tooltips);
  }

  componentWillUnmount() {
    // Destroy tooltip
    if (this.tooltips) {
      this.tooltips.forEach(tooltip => {
        tooltip.close();
      });
    }
  }

  render() {
    return (
      <ActionsContainer className={this.props.className}>
        {/* TODO: work on accessibility */}
        {/* eslint-disable jsx-a11y/click-events-have-key-events */}
        <Action
          onClick={this.props.edit}
          tabIndex={0}
          role="button"
          className="action-tooltipped waves-effect"
          data-tooltip="Edit"
        >
          <FontAwesomeIcon size="lg" icon={faEdit} />
        </Action>
        <Action
          onClick={this.props.reset}
          tabIndex={0}
          role="button"
          className="action-tooltipped waves-effect"
          data-tooltip="Reset"
        >
          <FontAwesomeIcon size="lg" icon={faRedo} />
        </Action>
        <Action
          onClick={this.props.delete}
          tabIndex={0}
          role="button"
          className="action-tooltipped waves-effect"
          data-tooltip="Delete"
        >
          <FontAwesomeIcon size="lg" icon={faTrashAlt} />
        </Action>
        {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      </ActionsContainer>
    );
  }
}
