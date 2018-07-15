import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ResetConfirmModal from "../components/ResetConfirmModal";
import modalActions from "../actions/modal";
import { resetTimer } from "../actions/timer";
import { Dispatch } from "../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      resetTimer,
      close: modalActions.closeModal
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ResetConfirmModal);
