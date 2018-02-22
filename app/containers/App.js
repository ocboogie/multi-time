// @flow
import React from "react";

import Hero from "../components/Hero";
import Timers from "./Timers";

export default () => (
  // $FlowIssue
  <>
    <div className="section">
      <Hero />
    </div>
    <div className="divider" />
    <div className="section">
      <Timers />
    </div>
  </>
);
