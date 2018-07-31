import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ResetConfirm from "../../components/Modals/ResetConfirm";
import { resetTimer } from "../../actions/timer";
import { Dispatch } from "../../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      resetTimer
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ResetConfirm);
