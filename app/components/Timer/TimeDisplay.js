// @flow
import React from "react";
import moment from "moment";

import TimeDisplay from "./TimeDisplayStyles";

export type Props = {|
  time: number
|};

export default (props: Props) => (
  <TimeDisplay>
    {moment.duration(props.time, "ms").format("d[d] h[h] m[m] s[s]", {
      trim: "both"
    })}
  </TimeDisplay>
);
