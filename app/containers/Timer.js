import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Timer from "../components/Timer";
import {
  startTimer,
  stopTimer,
  removeTimer,
  editTimer
} from "../actions/timer";
import type { State } from "../types/State";
import type { Dispatch } from "../types/Store";

export type Props = {|
  id: string
|};

const mapStateToProps = ({ timer }: State, { id }: Props) => ({
  timer: timer[id]
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

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
