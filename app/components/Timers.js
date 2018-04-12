// @flow
import React from "react";

import Timer from "../containers/Timer";
import type { TimerState } from "../reducers/timer";
import type { Timer as TimerType } from "../types/Timer";
import TimersContainer, { Item, Empty } from "./TimersStyles";

export type Props = {|
  timers: TimerState
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
        <Timer id={timer.id} />
      </Item>
    ));

  return <TimersContainer>{TimerComps}</TimersContainer>;
};
