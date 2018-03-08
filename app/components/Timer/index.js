// @flow
import React from "react";
import Materialize from "materialize-css";
import $ from "jquery";

import type { Timer as TimerType } from "../../types/Timer";
import Title from "./Title";
import TimeDisplay from "./TimeDisplay";
import Actions from "./Actions";

import Timer from "./indexStyles";

export type Props = {
  timer: TimerType,
  play: (id: string) => void,
  pause: (id: string) => void,
  delete: (id: string) => void,
  popTrash: () => void
};

export default (props: Props) => {
  const deleteFunc = () => {
    props.delete(props.timer.id);
    const $button = $('<button class="btn-flat toast-action">Undo</button>');
    const $toastContent = $("<span>You deleted a timer</span>").add($button);
    const toast = Materialize.toast($toastContent, 10000);
    $button.click(() => {
      toast.remove();
      props.popTrash();
    });
  };

  return (
    <Timer className="card">
      <div className="card-image">
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
        <Actions delete={deleteFunc} />
      </div>
    </Timer>
  );
};
