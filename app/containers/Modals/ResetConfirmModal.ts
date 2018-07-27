import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ResetConfirmModal from "../../components/Modals/ResetConfirm";
import modalActions from "../../actions/modal";
import { resetTimer } from "../../actions/timer";
import { Dispatch } from "../../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      resetTimer,
      close: modalActions.closeModal
    },
    dispatch
  );

const test = connect(
  null,
  mapDispatchToProps
)(ResetConfirmModal);

export default test;
