import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import modalActions from "../../actions/modal";
import LoginModal from "../../components/Modals/Login";
import { Dispatch } from "../../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      close: modalActions.closeModal
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(LoginModal);
