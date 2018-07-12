// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { closeModal } from "../actions/modal";
import LoginModal from "../components/LoginModal";
import type { Dispatch } from "../types/Store";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      close: closeModal
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(LoginModal);
