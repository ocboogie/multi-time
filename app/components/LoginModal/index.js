// @flow
import React, { Component } from "react";
import $ from "jquery";

import LoginModalContainer from "./indexStyles";
import Login from "./Login";
import Recover from "./Recover";
import Register from "./Register";

type Display = "login" | "register" | "recover";

export type Props = {|
  active: boolean,
  close: () => void,
  loggingIn: () => void
|};

export type State = {|
  display: Display
|};

export default class LoginModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      display: "login"
    };
  }

  componentDidMount() {
    // $FlowIssue
    $("#login_modal_tabs").tabs();
    // $FlowIssue
    $("#login_modal").modal({
      complete: this.props.close
    });
  }

  componentDidUpdate() {
    if (this.props.active) {
      // $FlowIssue
      $("#login_modal").modal("open");
    } else {
      // $FlowIssue
      $("#login_modal").modal("close");
    }
  }

  changeDisplay = (display: Display) => {
    this.setState({ display });
  };

  login = () => {
    this.props.loggingIn();
    // $FlowIssue
    $("#login_modal").modal("close");
  };

  render() {
    let content;

    // eslint-disable-next-line default-case
    switch (this.state.display) {
      case "login":
        content = (
          <Login
            login={this.login}
            forgotPassword={() => this.changeDisplay("recover")}
          />
        );
        break;
      case "register":
        content = <Register login={this.login} />;
        break;
      case "recover":
        content = <Recover />;
        break;
    }

    return (
      <LoginModalContainer id="login_modal" className="modal center-align">
        <ul id="login_modal_tabs" className="tabs tabs-fixed-width">
          <li className="tab">
            {/* TODO: work on accessibility */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid */}
            <a
              tabIndex={0}
              role="button"
              id="tab_login"
              onClick={() => {
                this.changeDisplay("login");
              }}
            >
              Login
            </a>
          </li>
          <li className="tab">
            {/* TODO: work on accessibility */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/anchor-is-valid */}
            <a
              tabIndex={0}
              role="button"
              id="tab_register"
              onClick={() => {
                this.changeDisplay("register");
              }}
            >
              Register
            </a>
          </li>
        </ul>
        <div className="modal-content">{content}</div>
        {/* {content} */}
        {/* <Login forgotPassword={() => this.changeDisplay("recover")} /> */}
        {/* <Register /> */}
      </LoginModalContainer>
    );
  }
}
