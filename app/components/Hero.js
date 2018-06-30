// @flow
import React from "react";

import Hero, { Logo } from "./HeroStyles";

export type Props = {|
  login: () => void,
  signOut: () => void,
  isLoggedIn: boolean
|};

export default ({ login, signOut, isLoggedIn }: Props) => {
  const Login = isLoggedIn ? (
    <button
      type="button"
      className="waves-effect waves-light btn-large"
      onClick={signOut}
    >
      Sign out
    </button>
  ) : (
    <button
      type="button"
      className="waves-effect waves-light btn-large"
      onClick={login}
    >
      Login
    </button>
  );

  return (
    <Hero>
      <Logo>Multi Time</Logo>
      <div className="right-align">{Login}</div>
    </Hero>
  );
};
