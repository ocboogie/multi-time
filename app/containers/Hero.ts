import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import modalActions from "../actions/modal";
import { signOut } from "../actions/auth";
import Hero from "../components/Hero";
import { State, Dispatch } from "../types";

const mapStateToProps = ({ auth }: State) => ({
  isLoggedIn: auth.stage === "loggedin"
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login: modalActions.displayLoginModal,
      signOut
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero);
