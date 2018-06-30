// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { closeModal } from "../actions/modal";
import { loggingIn } from "../actions/auth";
import LoginModal from "../components/LoginModal";
import type { State } from "../types/State";
import type { Dispatch } from "../types/Store";

const mapStateToProps = ({ modal }: State) => ({
  active: modal.active === "LOGIN"
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      close: closeModal,
      loggingIn
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
