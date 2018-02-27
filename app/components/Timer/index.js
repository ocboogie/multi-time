// @flow
import React from "react";

import type { Timer as TimerType } from "../../types/Timer";
import Title from "./Title";
import TimeDisplay from "./TimeDisplay";
import Actions from "./Actions";

import Timer from "./indexStyles";

export type Props = {
  timer: TimerType,
  play: (id: string) => void,
  pause: (id: string) => void
};

export default (props: Props) => (
  <Timer className="card">
    <div className="card-image drag-handle">
      <Title
        play={() => props.play(props.timer.id)} // Could be slow performance-wise
        pause={() => props.pause(props.timer.id)} // this as well
        paused={props.timer.paused}
        title={props.timer.name}
      />
    </div>
    <div className="card-content">
      <TimeDisplay time={props.timer.time} />
    </div>
    <div className="card-action">
      <Actions />
    </div>
  </Timer>
);
