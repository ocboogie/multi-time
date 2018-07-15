import React from "react";

import HeroContainer, { Logo } from "./HeroStyles";

export interface Props {
  login: () => void;
  signOut: () => void;
  isLoggedIn: boolean;
}

const Hero = ({ login, signOut, isLoggedIn }: Props) => {
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
    <HeroContainer>
      <Logo>Multi Time</Logo>
      <div className="right-align">{Login}</div>
    </HeroContainer>
  );
};

Hero.displayName = "Hero";

export default Hero;
