// @flow
import React, { Component } from "react";
import Materialize from "materialize-css";
import $ from "jquery";

import type { Timer as TimerType, ModTimer } from "../../types/Timer";
import Title from "./Title";
import TimeDisplay from "./TimeDisplay";
import Actions from "./Actions";

import TimerContainer from "./indexStyles";

export type Props = {
  timer: TimerType,
  play: (id: string) => void,
  pause: (id: string) => void,
  delete: (id: string) => void,
  popTrash: () => void,
  editTimer: (id: string, modification: ModTimer) => void
};

export type State = {
  editableTitle: boolean
};

export default class Timer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { editableTitle: props.timer.name === null };
  }

  handleDelete = () => {
    this.props.delete(this.props.timer.id);
    const $button = $('<button class="btn-flat toast-action">Undo</button>');
    const $toastContent = $("<span>You deleted a timer</span>").add($button);
    const toast = Materialize.toast($toastContent, 10000);
    $button.click(() => {
      toast.remove();
      this.props.popTrash();
    });
  };

  handleEdit = () => {
    this.setState({ editableTitle: true });
  };

  handleEditCancel = () => {
    this.setState({ editableTitle: false });
  };

  render() {
    return (
      <TimerContainer className="card">
        <div className="card-image">
          <Title
            play={() => this.props.play(this.props.timer.id)}
            pause={
              () => this.props.pause(this.props.timer.id) // Could be slow performance-wise
            }
            paused={
              this.props.timer.paused // this as well
            }
            title={this.props.timer.name || ""}
            changeTitle={(title: string) =>
              this.props.editTimer(this.props.timer.id, { name: title })
            }
            editable={this.state.editableTitle}
            cancelEdit={this.handleEditCancel}
          />
        </div>
        <div className="card-content">
          <TimeDisplay time={this.props.timer.time} />
        </div>
        <div className="card-action">
          <Actions delete={this.handleDelete} edit={this.handleEdit} />
        </div>
      </TimerContainer>
    );
  }
}
