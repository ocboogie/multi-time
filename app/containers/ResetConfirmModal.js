// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ResetConfirmModal from "../components/ResetConfirmModal";
import { closeModal } from "../actions/modal";
import { resetTimer } from "../actions/timer";
import type { Dispatch } from "../types/Store";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      resetTimer,
      close: closeModal
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ResetConfirmModal);
