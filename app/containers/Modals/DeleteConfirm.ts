import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DeleteConfirm from "../../components/Modals/DeleteConfirm";
import { permRemoveTimer } from "../../actions/timer";
import { Dispatch } from "../../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      removeTimer: permRemoveTimer
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(DeleteConfirm);
