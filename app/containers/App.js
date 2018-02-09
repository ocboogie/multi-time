// @flow
import React from "react";

import Counter from "./Counter";
import Hero from "../components/Hero";

export default () => (
  <div>
    <div className="section">
      <Hero />
    </div>
    <div className="divider" />
    <div className="section">
      <Counter />
    </div>
  </div>
);
