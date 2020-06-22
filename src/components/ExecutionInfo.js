import React from 'react';
import { connect } from "react-redux";
import * as configurationActions from "../actions/configuration";

class ExecutionInfo extends React.Component {
  render() {
    if (this.props.currentStep !== 5) {
      return null
    }

    return (
      <div>
        <div className="ui icon info message">
          <i className="inbox icon"></i>
          <div className="content">
            <div className="header">
              Script Execution {this.props.scriptExecutionStatus}
            </div>
            <p>Please check below for the progress.</p>
          </div>
        </div>
        <div className="ui message">
          <p>{this.props.scriptExecutionMessage}</p>
        </div>
      </div>
    );
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
)(ExecutionInfo);
