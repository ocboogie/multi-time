// @flow
import React from "react";

import TimeDisplay from "./TimeDisplayStyles";

export type Props = {|
  time: number
|};

export default (props: Props) => <TimeDisplay>{props.time}</TimeDisplay>;
