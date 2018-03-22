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
import type { Dispatch } from "../types/Store";

const mapStateToProps = ({ timer }: State) => ({
  timers: timer
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
