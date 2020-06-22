import React from 'react';
import { connect } from "react-redux";
import * as configurationActions from "../actions/configuration";

class PreviousNextButton extends React.Component {
  render() {
    return (
      <div className="mt-md-5">
        {this.previousButton()}
        {this.nextButton()}
      </div>
    );
  }
  _next = () => {
    let currentStep = this.props.currentStep
    currentStep = currentStep >= 4 ? 5 : currentStep + 1
    this.props.next(currentStep);
  }

  _prev = () => {
    let currentStep = this.props.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.props.previous(currentStep);
  }

  previousButton() {
    let currentStep = this.props.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="ui orange button"
          type="button" onClick={this._prev}>
          Previous
        </button>
      )
    }
    return null;
  }

  nextButton() {
    let currentStep = this.props.currentStep;
    if (currentStep < 5 && currentStep !== 4) {
      return (
        <button
          className="ui blue button"
          type="button" onClick={this._next}>
          Next
        </button>
      )
    }
    return null;
  }


}
const mapStateToProps = ({ configuration }) => {
  return configuration;
};

export default connect(
  mapStateToProps,
  {
    ...configurationActions,
  }
)(PreviousNextButton);
