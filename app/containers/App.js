// @flow
import React from "react";
import uuid from "uuid/v4";

// import Counter from "./Counter";
import Hero from "../components/Hero";
// import Timer from "../components/Timer/index";
import Timers from "../components/Timers";

export default () => (
  // $FlowIssue
  <>
    <div className="section">
      <Hero />
    </div>
    <div className="divider" />
    <div className="section">
      <Timers
        timers={[
          { x: 0, y: 0, time: 0, name: "first", paused: false, id: uuid() },
          { x: 1, y: 0, time: 0, name: "second", paused: false, id: uuid() },
          { x: 1, y: 0, time: 0, name: "third", paused: false, id: uuid() },
          { x: 1, y: 0, time: 0, name: "fourth", paused: false, id: uuid() },
          { x: 1, y: 0, time: 0, name: "fifth", paused: false, id: uuid() },
          { x: 1, y: 0, time: 0, name: "sixth", paused: false, id: uuid() },
          { x: 1, y: 0, time: 0, name: "seventh", paused: false, id: uuid() },
          { x: 1, y: 0, time: 0, name: "eighth", paused: false, id: uuid() }
        ]}
      />
    </div>
  </>
);
