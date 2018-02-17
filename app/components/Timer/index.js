// @flow
import React from "react";

import type { Timer as TimerType } from "../../types/Timer";
import Title from "./Title";
import TimeDisplay from "./TimeDisplay";
import Actions from "./Actions";

import Timer from "./indexStyles";

type Props = {
  timer: TimerType
};

export default (props: Props) => (
  <Timer className="card">
    <div className="card-image">
      <Title title={props.timer.name} />
    </div>
    <div className="card-content">
      <TimeDisplay time={1000} />
    </div>
    <div className="card-action">
      <Actions />
    </div>
  </Timer>
);
