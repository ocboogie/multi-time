import React, { Component } from "react";
import geoPattern from "geopattern";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";

import TitleContainer, { PauseFab, PlayFab, TitleEdit } from "./TitleStyles";

export interface Props {
  title: string;
  paused: boolean;
  editable: boolean;
  play: () => void;
  pause: () => void;
  changeTitle: (title: string) => void;
  cancelEdit: () => void;
}

export type State = { title: string };

export default class Title extends Component<Props, State> {
  titleInput: HTMLInputElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = { title: this.props.title };
  }

  shouldComponentUpdate(props: Props) {
    if (props.title !== this.state.title && !props.editable) {
      this.setState({ title: props.title });
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.updateTitleFocus();
  }

  componentDidUpdate() {
    this.updateTitleFocus();
  }

  updateTitleFocus = () => {
    if (this.props.editable && this.titleInput) {
      this.titleInput.focus();
    }
  };

  fabClickHandler = () => {
    if (this.props.paused) {
      this.props.play();
    } else {
      this.props.pause();
    }
  };

  handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ title: event.currentTarget.value });
  };

  cancelEditing = () => {
    this.props.cancelEdit();
    this.props.changeTitle(this.state.title);
  };

  handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.cancelEditing();
    }
  };

  handleTitleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  render() {
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
        innerRef={titleInput => (this.titleInput = titleInput)}
        type="text"
        value={this.state.title}
        onChange={this.handleTitleChange}
        onBlur={this.cancelEditing}
        onKeyPress={this.handleTitleKeyPress}
        onFocus={this.handleTitleFocus}
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
