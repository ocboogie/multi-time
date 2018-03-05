// @flow
import React from "react";

import Timer from "./Timer";
import type { TimerState } from "../reducers/timer";
import TimersContainer, { Item } from "./TimersStyles";

export type Props = {
  timers: TimerState,
  play: (id: string) => void,
  pause: (id: string) => void
};

export default (props: Props) => {
  // See https://github.com/facebook/flow/issues/2221
  const TimerComps = Object.keys(props.timers).map(timerId => {
    const timer = props.timers[timerId];
    return (
      <Item key={timer.id}>
        <Timer play={props.play} pause={props.pause} timer={timer} />
      </Item>
    );
  });

  return <TimersContainer>{TimerComps}</TimersContainer>;
};
