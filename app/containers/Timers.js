// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Timers from "../components/Timers";
import type { Props } from "../components/Timers";
import type { State } from "../types/State";
import {
  startTimer,
  stopTimer,
  removeTimer,
  editTimer
} from "../actions/timer";

function mapStateToProps(state: State): Props {
  return {
    timers: state.timer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    play: bindActionCreators(startTimer, dispatch),
    pause: bindActionCreators(stopTimer, dispatch),
    delete: bindActionCreators(removeTimer, dispatch),
    editTimer: bindActionCreators(editTimer, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
