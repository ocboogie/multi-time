import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Add from "../components/Add";
import { generateTimer } from "../actions/timer";

function mapDispatchToProps(dispatch) {
  return {
    click: bindActionCreators(generateTimer, dispatch)
  };
}

export default connect(() => ({}), mapDispatchToProps)(Add);
