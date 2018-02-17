// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { increment, decrement } from "../actions/counter";
import type { State } from "../types/State";

export type Props = {
  counter: number,
  increment: () => void
};

// eslint-disable-next-line react/prefer-stateless-function
class Counter extends Component<Props> {
  render() {
    return (
      <div>
        <button
          className="waves-effect waves-light btn"
          onClick={this.props.increment}
        >
          button
        </button>
        {this.props.counter}
      </div>
    );
  }
}

const mapStateToProps = ({ timer }: State) => ({
  timer
});

const mapDispatchToProps = (dispatch: *) =>
  bindActionCreators(
    {
      // increment,
      // decrement
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
