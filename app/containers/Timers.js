import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Timers from "../components/Timers";
import {
  startTimer,
  stopTimer,
  removeTimer,
  editTimer
} from "../actions/timer";
import type { State } from "../types/State";
import type { Timer } from "../types/Timer";
import type { Dispatch } from "../types/Store";

const mapStateToProps = ({ timer: timerState }: State) => ({
  timers: Object.values(timerState).map((timer: Timer) => ({
    name: timer.name,
    id: timer.id
  }))
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      play: startTimer,
      pause: stopTimer,
      delete: removeTimer,
      editTimer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Timers);
