import { connect } from "react-redux";

import TimeDisplay from "../components/Timer/TimeDisplay";
import { State } from "../types";

export interface Props {
  id: string;
}

const mapStateToProps = ({ timer }: State, { id }: Props) => ({
  timing: timer[id].timing
});

export default connect(mapStateToProps)(TimeDisplay);
