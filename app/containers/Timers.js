// @flow
import { connect } from "react-redux";
import Timers from "../components/Timers";
import type { Props } from "../components/Timers";

import type { State } from "../types/State";

function mapStateToProps(state: State): Props {
  return {
    timers: state.timer
  };
}

export default connect(mapStateToProps)(Timers);
