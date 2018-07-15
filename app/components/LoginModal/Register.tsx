import React, { Component } from "react";
import isEmail from "validator/lib/isEmail";
import firebase from "firebase";

import readablePasswordValidator from "../../utils/readablePasswordValidator";
import formClassValid from "../../utils/formClassValid";
import RegisterContainer from "./RegisterStyles";

type Fields = keyof typeof Login.validators;

export interface Props {
  loggedIn: () => void;
}

export interface State {
  error: string;
  fields: {
    [Field in Fields]: {
      value: string;
      isValid: boolean | string | null;
    }
  };
}

export default class Login extends Component<Props, State> {
  static validators = {
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
    // This might be broken
    passwordConfirm: (value: string, password?: string) => {
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

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const field = event.currentTarget.id as Fields;
    const value = event.currentTarget.value;
    let samePasswordCheck = {};
    if (
      field === "password" &&
      this.state.fields.passwordConfirm.isValid !== null
    ) {
      samePasswordCheck = {
        passwordConfirm: {
          value: this.state.fields.passwordConfirm.value,
          isValid: Login.validators.passwordConfirm(
            this.state.fields.passwordConfirm.value,
            value
          )
        }
      };
    }
    this.setState((prevState: State) => ({
      fields: {
        ...prevState.fields,
        ...samePasswordCheck,
        [field]: {
          value,
          isValid: Login.validators[field](value)
        }
      }
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.fields.email.value,
        this.state.fields.password.value
      )
      .then(() => {
        this.props.loggedIn();
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  validateForm() {
    return Object.values(this.state.fields).every(
      field => field.isValid === true
    );
  }

  render() {
    const { fields, error } = this.state;
    const { email, password, passwordConfirm } = fields;

    return (
      <>
        <h4>Register</h4>
        <hr />
        <RegisterContainer className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={email.value}
                  onChange={this.handleChange}
                  id="email"
                  type="email"
                  className={formClassValid(email.isValid)}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label data-error={email.isValid} htmlFor="email">
                  Email
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={password.value}
                  onChange={this.handleChange}
                  id="password"
                  type="password"
                  className={formClassValid(password.isValid)}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label data-error={password.isValid} htmlFor="password">
                  Password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={passwordConfirm.value}
                  onChange={this.handleChange}
                  id="passwordConfirm"
                  type="password"
                  className={formClassValid(passwordConfirm.isValid)}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-for */}
                <label
                  data-error={passwordConfirm.isValid}
                  htmlFor="passwordConfirm"
                >
                  Confirm Password
                </label>
              </div>
            </div>
            <div className="row error-row">
              <div className={`col s12 error ${error ? "active" : ""}`}>
                {error}
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
