import React from "react";

import TimersContainer, { Item, Empty } from "./TimersStyles";
import { TimerState } from "../reducers/timer";
import { AuthState } from "../reducers/auth";
import { Timer as TimerType } from "../types";
import Timer from "../containers/Timer";

export interface Props {
  timers: TimerState;
  authState: AuthState;
}

export default (props: Props) => {
  if (props.authState === "signedout") {
    return <Empty>You aren&apos;t logged in!</Empty>;
  }
  if (props.authState === "loggingin") {
    return <Empty>Loading...</Empty>;
  }
  if (Object.values(props.timers).length === 0) {
    return (
      <Empty>
        You don&apos;t have any timers! Click the plus button to add a timer.
      </Empty>
    );
  }

  const TimerComps = Object.values(props.timers)
    .sort((a, b) => {
      if (!a.name) {
        return -1;
      }
      if (!b.name) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    })
    .map((timer: TimerType) => (
      <Item key={timer.id}>
        <Timer id={timer.id} />
      </Item>
    ));

  return <TimersContainer>{TimerComps}</TimersContainer>;
};
