// @flow
import React, { Component } from "react";
import isEmail from "validator/lib/isEmail";
import firebase from "firebase";

import readablePasswordValidator from "../../utils/readablePasswordValidator";
import formClassValid from "../../utils/formClassValid";
import RegisterContainer from "./RegisterStyles";

export type Props = {|
  login: () => void
|};

export type State = {|
  error: string,
  fields: {
    [string]: {
      value: string,
      isValid: boolean | string | null
    }
  }
|};

export default class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: "",
      fields: {
        email: {
          value: "",
          isValid: null
        },
        password: {
          value: "",
          isValid: null
        },
        passwordConfirm: {
          value: "",
          isValid: null
        }
      }
    };
  }

  validators = {
    email(value: string) {
      const isValid = isEmail(value);
      if (isValid) {
        return isValid;
      }
      return "This is not a valid email";
    },
    password: (value: string) => {
      const isValid = readablePasswordValidator(value);
      if (isValid !== true) {
        return isValid;
      }
      return true;
    },
    passwordConfirm: (
      value: string,
      password?: string = this.state.fields.password.value
    ) => {
      const isValid = readablePasswordValidator(value);
      if (isValid !== true) {
        return isValid;
      }
      if (value !== password) {
        return "Passwords don't match";
      }
      return true;
    }
  };

  validateForm() {
    return Object.values(this.state.fields).every(
      // $FlowIssue
      field => field.isValid === true
    );
  }

  handleChange = (event: { target: { id: string, value: string } }) => {
    let samePasswordCheck = {};
    if (
      event.target.id === "password" &&
      this.state.fields.passwordConfirm.isValid !== null
    ) {
      samePasswordCheck = {
        passwordConfirm: {
          value: this.state.fields.passwordConfirm.value,
          isValid: this.validators.passwordConfirm(
            this.state.fields.passwordConfirm.value,
            event.target.value
          )
        }
      };
    }
    this.setState({
      fields: {
        ...this.state.fields,
        ...samePasswordCheck,
        [event.target.id]: {
          value: event.target.value,
          isValid: this.validators[event.target.id](event.target.value)
        }
      }
    });
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.fields.email.value,
        this.state.fields.password.value
      )
      .then(() => {
        this.props.login();
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  render() {
    return (
      // $FlowIssue
      <>
        <h4>Register</h4>
        <hr />
        <RegisterContainer className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.fields.email.value}
                  onChange={this.handleChange}
                  id="email"
                  type="email"
                  className={formClassValid(this.state.fields.email.isValid)}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label
                  data-error={this.state.fields.email.isValid}
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.fields.password.value}
                  onChange={this.handleChange}
                  id="password"
                  type="password"
                  className={formClassValid(this.state.fields.password.isValid)}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label
                  data-error={this.state.fields.password.isValid}
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.fields.passwordConfirm.value}
                  onChange={this.handleChange}
                  id="passwordConfirm"
                  type="password"
                  className={formClassValid(
                    this.state.fields.passwordConfirm.isValid
                  )}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label
                  data-error={this.state.fields.passwordConfirm.isValid}
                  htmlFor="passwordConfirm"
                >
                  Confirm Password
                </label>
              </div>
            </div>
            <div className="row error-row">
              <div
                className={`col s12 error ${this.state.error ? "active" : ""}`}
              >
                {this.state.error}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <button
                  type="submit"
                  className={`waves-effect waves-light btn-large ${
                    !this.validateForm() ? "disabled" : ""
                  }`}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </RegisterContainer>
      </>
    );
  }
}
