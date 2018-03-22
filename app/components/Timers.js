// @flow
import React from "react";

import Timer from "./Timer";
import type { TimerState } from "../reducers/timer";
import type { Timer as TimerType, ModTimer } from "../types/Timer";
import TimersContainer, { Item, Empty } from "./TimersStyles";

export type Props = {|
  timers: TimerState,
  play: (id: string) => void,
  pause: (id: string) => void,
  delete: (id: string) => void,
  editTimer: (id: string, modification: ModTimer) => void
|};

export default (props: Props) => {
  if (Object.values(props.timers).length === 0) {
    return (
      <Empty>
        You don&apos;t have any timers! Click the plus button to add a timer.
      </Empty>
    );
  }

  // See https://github.com/facebook/flow/issues/2221
  const TimerComps = Object.values(props.timers) // $FlowIssue
    .sort((a: TimerType, b: TimerType) => a.name.localeCompare(b.name)) // $FlowIssue
    .map((timer: TimerType) => (
      <Item key={timer.id}>
        <Timer
          play={props.play}
          pause={props.pause}
          delete={props.delete}
          editTimer={props.editTimer}
          timer={timer}
        />
      </Item>
    ));

  return <TimersContainer>{TimerComps}</TimersContainer>;
};
