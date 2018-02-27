// @flow
import React, { Component } from "react";
import geoPattern from "geopattern";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/fontawesome-free-solid";

import TitleContainer, { PauseFab, PlayFab } from "./TitleStyles";

export type Props = {
  title: string,
  paused: boolean,
  play: () => void,
  pause: () => void
};

export default class Title extends Component<Props> {
  constructor(props: Props) {
    super(props);

    // $FlowFixMe
    this.fabClickHandler = this.fabClickHandler.bind(this);
  }

  fabClickHandler() {
    if (this.props.paused) {
      this.props.play();
    } else {
      this.props.pause();
    }
  }

  render() {
    const pattern = geoPattern.generate(this.props.title);

    const Fab = this.props.paused ? (
      <PlayFab>
        <FontAwesomeIcon size="lg" icon={faPlay} />
      </PlayFab>
    ) : (
      <PauseFab>
        <FontAwesomeIcon size="lg" icon={faPause} />
      </PauseFab>
    );

    return (
      <TitleContainer
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,${pattern.toSvg()}')`
          // backgroundImage: pattern.toDataUrl()
        }}
      >
        <span className="card-title">{this.props.title}</span>
        <div
          onClick={this.fabClickHandler}
          onKeyDown={this.fabClickHandler}
          role="button"
          tabIndex={0}
          className="btn-floating halfway-fab waves-effect waves-light red"
        >
          {Fab}
        </div>
      </TitleContainer>
    );
  }
}
