import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Add from "../components/Add";
import { generateTimer } from "../actions/timer";
import type { Dispatch } from "../types/Store";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      click: generateTimer
    },
    dispatch
  );

export default connect(() => ({}), mapDispatchToProps)(Add);
