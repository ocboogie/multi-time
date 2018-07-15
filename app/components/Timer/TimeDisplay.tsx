import React, { Component } from "react";
import prettyMs from "pretty-ms";

import { Timing } from "../../types";
import TimeDisplay from "./TimeDisplayStyles";
import getElapsedTime from "../../utils/getElapsedTime";

export interface Props {
  timing: Timing;
}

export default class Timer extends Component<Props> {
  componentDidMount() {
    if (!this.props.timing.paused) {
      requestAnimationFrame(this.updateLoop);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.timing.paused && prevProps.timing.paused) {
      requestAnimationFrame(this.updateLoop);
    }
  }

  componentWillUnmount() {
    this.props.timing.paused = true;
  }

  updateLoop = () => {
    if (this.props.timing.paused) {
      return;
    }
    this.forceUpdate();
    requestAnimationFrame(this.updateLoop);
  };

  render() {
    const { timing } = this.props;
    const elapsed = getElapsedTime(timing.baseTime, timing.startedAt);
    return (
      <TimeDisplay>{prettyMs(elapsed, { secDecimalDigits: 1 })}</TimeDisplay>
    );
  }
}
