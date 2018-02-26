// @flow
import React, { Component } from "react";
import Muuri from "muuri";

import Timer from "./Timer";
import type { TimerState } from "../reducers/timer";
import TimersContainer, { Item } from "./TimersStyles";

export type Props = {
  timers: TimerState
};

export default class Timers extends Component<Props> {
  componentDidMount() {
    // eslint-disable-next-line no-new
    new Muuri(".grid", {
      dragEnabled: true,
      dragStartPredicate: {
        distance: 0,
        delay: 50,
        handle: ".drag-handle"
      }
    });
  }

  render() {
    // See https://github.com/facebook/flow/issues/2221
    const TimerComps = Object.keys(this.props.timers).map(timerId => {
      const timer = this.props.timers[timerId];
      return (
        <Item key={timer.id} className="item">
          <Timer timer={timer} />
        </Item>
      );
    });

    return <TimersContainer className="grid">{TimerComps}</TimersContainer>;
  }
}
