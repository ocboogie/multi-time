// @flow
import React, { Component } from "react";
import geoPattern from "geopattern";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/fontawesome-free-solid";

import TitleContainer, { PauseFab, PlayFab, TitleEdit } from "./TitleStyles";

export type Props = {
  title: string,
  paused: boolean,
  editable: boolean,
  play: () => void,
  pause: () => void,
  changeTitle: (title: string) => void
};

export type State = {
  title: string
};

export default class Title extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // $FlowFixMe
    this.fabClickHandler = this.fabClickHandler.bind(this);
    // $FlowFixMe
    this.handleTitleChange = this.handleTitleChange.bind(this);
    // $FlowFixMe
    this.handleTitleBlur = this.handleTitleBlur.bind(this);
    this.state = { title: this.props.title };
  }

  fabClickHandler() {
    if (this.props.paused) {
      this.props.play();
    } else {
      this.props.pause();
    }
  }

  // eslint-disable-next-line no-undef
  handleTitleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ title: event.target.value });
  }

  handleTitleBlur() {
    this.props.changeTitle(this.state.title);
  }

  render() {
    // eslint-disable-next-line no-undef
    const handleFocus = (event: SyntheticInputEvent<HTMLInputElement>) => {
      event.target.select();
    };

    const pattern = geoPattern.generate(this.state.title);

    const Fab = this.props.paused ? (
      <PlayFab>
        <FontAwesomeIcon size="lg" icon={faPlay} />
      </PlayFab>
    ) : (
      <PauseFab>
        <FontAwesomeIcon size="lg" icon={faPause} />
      </PauseFab>
    );

    const title = this.props.editable ? (
      <TitleEdit
        autoFocus
        type="text"
        value={this.state.title}
        onChange={this.handleTitleChange}
        onBlur={this.handleTitleBlur}
        onFocus={handleFocus}
      />
    ) : (
      this.state.title
    );

    return (
      <TitleContainer
        style={{
          backgroundImage: pattern.toDataUrl()
        }}
      >
        <span className="card-title">{title}</span>
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
