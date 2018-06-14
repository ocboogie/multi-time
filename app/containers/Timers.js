import { connect } from "react-redux";

import Timers from "../components/Timers";
import type { State } from "../types/State";

const mapStateToProps = ({ auth, timer: timerState }: State) => ({
  authState: auth,
  timers: timerState
});

export default connect(mapStateToProps)(Timers);
