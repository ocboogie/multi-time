// @flow
import React, { Component } from "react";
import prettyMs from "pretty-ms";

import type { Timing } from "../../types/Timer";
import TimeDisplay from "./TimeDisplayStyles";
import getElapsedTime from "../../utils/getElapsedTime";

export type Props = {|
  timing: Timing
|};

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
      <TimeDisplay>
        {/* $FlowIssue */}
        {prettyMs(elapsed, { keepDecimalsOnWholeSeconds: true })}
      </TimeDisplay>
    );
  }
}
