import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Timer from "../components/Timer";
import {
  startTimer,
  stopTimer,
  removeTimer,
  editTimer
} from "../actions/timer";
import { displayResetConfirm } from "../actions/modal";
import { State, Dispatch } from "../types";

export interface Props {
  id: string;
}

const mapStateToProps = ({ timer }: State, { id }: Props) => ({
  timer: timer[id]
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      play: startTimer,
      pause: stopTimer,
      delete: removeTimer,
      displayResetConfirm,
      editTimer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
