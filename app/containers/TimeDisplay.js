import { connect } from "react-redux";

import TimeDisplay from "../components/Timer/TimeDisplay";
import type { State } from "../types/State";

export type Props = {|
  id: string
|};

const mapStateToProps = ({ timer }: State, { id }: Props) => ({
  timing: timer[id].timing
});

export default connect(mapStateToProps)(TimeDisplay);
