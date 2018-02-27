import { connect } from "react-redux";
import Timers from "../components/Timers";
import { startTimer, stopTimer } from "../actions/timer";
import { bindActionCreators } from "redux";
import type { Props } from "../components/Timers";

import type { State } from "../types/State";

function mapStateToProps(state: State): Props {
  return {
    timers: state.timer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    play: bindActionCreators(startTimer, dispatch),
    pause: bindActionCreators(stopTimer, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
