// @flow
import React, { Component } from "react";

import type { Timer as TimerType, ModTimer } from "../../types/Timer";
import getElapsedTime from "../../utils/getElapsedTime";
import Title from "./Title";
import TimeDisplay from "../../containers/TimeDisplay";
import Actions from "./Actions";
import TimerContainer from "./indexStyles";

export type Props = {|
  timer: TimerType,
  play: (id: string, baseTime: number) => void,
  pause: (id: string) => void,
  delete: (id: string) => void,
  editTimer: (id: string, modification: ModTimer) => void,
  displayResetConfirm: (id: string) => void
|};

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
  };

  handleReset = () => {
    this.props.displayResetConfirm(this.props.timer.id);
  };

  handleEdit = () => {
    this.setState({ editableTitle: true });
  };

  handleEditCancel = () => {
    this.setState({ editableTitle: false });
  };

  render() {
    const { timer } = this.props;

    return (
      <TimerContainer className="card">
        <div className="card-image">
          <Title
            play={() =>
              this.props.play(
                timer.id,
                getElapsedTime(
                  timer.timing.baseTime,
                  timer.timing.startedAt,
                  timer.timing.stoppedAt
                )
              )
            }
            pause={
              () => this.props.pause(timer.id) // Could be slow performance-wise
            }
            paused={timer.timing.paused}
            title={timer.name || ""}
            changeTitle={(title: string) =>
              this.props.editTimer(timer.id, { name: title })
            }
            editable={this.state.editableTitle}
            cancelEdit={this.handleEditCancel}
          />
        </div>
        <div className="card-content">
          <TimeDisplay id={timer.id} />
        </div>
        <div className="card-action">
          <Actions
            edit={this.handleEdit}
            reset={this.handleReset}
            delete={this.handleDelete}
          />
        </div>
      </TimerContainer>
    );
  }
}
