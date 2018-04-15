// @flow
import React from "react";

import Hero from "../components/Hero";
import Add from "../containers/Add";
import Timers from "./Timers";
import ResetConfirmModal from "./ResetConfirmModal";

export default () => (
  // $FlowIssue
  <>
    <Add />
    <div className="section">
      <Hero />
    </div>
    <div className="divider" />
    <div className="section">
      <Timers />
    </div>
    <ResetConfirmModal />
  </>
);
