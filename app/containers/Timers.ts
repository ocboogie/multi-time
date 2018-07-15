import { connect } from "react-redux";

import Timers from "../components/Timers";
import { State } from "../types";

const mapStateToProps = ({ auth, timer: timerState }: State) => ({
  authState: auth,
  timers: timerState
});

export default connect(mapStateToProps)(Timers);
