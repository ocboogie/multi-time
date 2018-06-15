// @flow
import React from "react";

import Add from "../containers/Add";
import Timers from "./Timers";
import Hero from "./Hero";
import ResetConfirmModal from "./ResetConfirmModal";
import LoginModal from "../containers/LoginModal";

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
    <LoginModal />
  </>
);
