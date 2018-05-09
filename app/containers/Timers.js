import { connect } from "react-redux";

import Timers from "../components/Timers";
import type { State } from "../types/State";

const mapStateToProps = ({ loggedIn, timer: timerState }: State) => ({
  loggedIn,
  timers: timerState
});

export default connect(mapStateToProps)(Timers);
