// @flow
import React, { Component } from "react";
import Muuri from "muuri";

import Timer from "./Timer";
import type { Timer as TimerType } from "../types/Timer";
import TimersContainer, { Item } from "./TimersStyles";

type Props = {
  timers: Array<TimerType>
};

export default class Timers extends Component<Props> {
  componentDidMount() {
    // eslint-disable-next-line no-new
    new Muuri(".grid", { dragEnabled: true });
  }

  render() {
    // <Timer key={timer.id} timer={timer} />;
    const TimerComps = this.props.timers.map(timer => (
      <Item key={timer.id} className="item">
        <Timer timer={timer} />
      </Item>
    ));

    return <TimersContainer className="grid">{TimerComps}</TimersContainer>;
  }
}
