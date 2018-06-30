// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { displayLoginModal } from "../actions/modal";
import { signOut } from "../actions/auth";
import Hero from "../components/Hero";
import type { State } from "../types/State";
import type { Dispatch } from "../types/Store";

const mapStateToProps = ({ auth }: State) => ({
  isLoggedIn: auth === "loggedin"
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login: displayLoginModal,
      signOut
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero);
