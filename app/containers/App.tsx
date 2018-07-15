import React from "react";

import Add from "./Add";
import Timers from "./Timers";
import Hero from "./Hero";
import Modals from "./Modals";

export default () => (
  <>
    <Add />
    <div className="section">
      <Hero />
    </div>
    <div className="divider" />
    <div className="section">
      <Timers />
    </div>
    <Modals />
  </>
);
