// @flow
import React from "react";

import Timer from "./Timer";
import type { TimerState } from "../reducers/timer";
import type { Timer as TimerType } from "../types/Timer";
import TimersContainer, { Item } from "./TimersStyles";

export type Props = {
  timers: TimerState,
  play: (id: string) => void,
  pause: (id: string) => void,
  delete: (id: string) => void,
  popTrash: () => void
};

export default (props: Props) => {
  // See https://github.com/facebook/flow/issues/2221
  const TimerComps = Object.values(props.timers) // $FlowIssue
    .sort((a: TimerType, b: TimerType) => a.name.localeCompare(b.name)) // $FlowIssue
    .map((timer: TimerType) => (
      <Item key={timer.id}>
        <Timer
          play={props.play}
          pause={props.pause}
          delete={props.delete}
          popTrash={props.popTrash}
          timer={timer}
        />
      </Item>
    ));

  return <TimersContainer>{TimerComps}</TimersContainer>;
};
