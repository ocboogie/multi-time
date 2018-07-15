import React, { Component } from "react";
import $ from "jquery";
import Materialize from "materialize-css";

import LoginModalContainer from "./indexStyles";
import Login from "./Login";
import Recover from "./Recover";
import Register from "./Register";

type Display = "login" | "register" | "recover";

export interface Props {
  close: () => any;
}

export interface State {
  display: Display;
}

export default class LoginModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      display: "login"
    };
  }

  componentDidMount() {
    const tab = document.getElementById("login_modal_tabs");
    if (tab !== null) {
      const instance = Materialize.Tabs.init(tab);
      instance.updateTabIndicator();
    }

    $("#login_modal").modal({
      onCloseEnd: this.props.close
    });
    $("#login_modal").modal("open");
  }

  changeDisplay = (display: Display) => {
    this.setState({ display });
  };

  successfullyLoggedIn = () => {
    $("#login_modal").modal("close");
  };

  render() {
    let content;

    switch (this.state.display) {
      case "login":
        content = (
          <Login
            loggedIn={this.successfullyLoggedIn}
            forgotPassword={() => this.changeDisplay("recover")}
          />
        );
        break;
      case "register":
        content = <Register loggedIn={this.successfullyLoggedIn} />;
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
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events */}
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
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events */}
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
      </LoginModalContainer>
    );
  }
}
