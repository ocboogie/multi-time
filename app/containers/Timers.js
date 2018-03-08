import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Timers from "../components/Timers";
import { startTimer, stopTimer, removeTimer } from "../actions/timer";
import { popTrash } from "../actions/trash";
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
    pause: bindActionCreators(stopTimer, dispatch),
    delete: bindActionCreators(removeTimer, dispatch),
    popTrash: bindActionCreators(popTrash, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
