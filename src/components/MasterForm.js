import React from 'react';
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import StepsInfo from './StepsInfo';
import PreviousNextButton from './PreviousNextButton';
import BasicInfo from './BasicInfo';
import ServerInfo from './ServerInfo';
import SoftwareInfo from './SoftwareInfo';
import DeploymentInfo from './DeploymentInfo';
import ExecutionInfo from './ExecutionInfo';
import * as configurationActions from "../actions/configuration";

class MasterForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault()
    //increment step if itis deployment page
    if (this.props.currentStep === 4) {
      let currentStep = this.props.currentStep
      currentStep = currentStep + 1
      this.props.next(currentStep);
    }
    //console.log(JSON.stringify(this.props));
    this.props.startScriptExecution();
    this.props.getScriptExecutionStatus();
  }

  componentDidMount() {
    this.props.startFetchingConfiguration();
    this.props.getConfiguration();
  }

  render() {
    if (this.props.loading)
      return (
        <div className="">
          <BounceLoader />
        </div>
      );

    return (
      <div className="sixteen wide column">
        <StepsInfo />
        <form onSubmit={this.handleSubmit}>
          <BasicInfo />
          <ServerInfo />
          <SoftwareInfo />
          <DeploymentInfo />
          <ExecutionInfo />
          <PreviousNextButton />
          {(this.props.currentStep === 4) && this.renderSubmitButton()}
        </form>
      </div>
    );
  }

  renderSubmitButton() {
    return (
      <div className="fields float-right">
        <div className="eight wide field">
          <button className="ui green button">Submit</button>
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
)(MasterForm);

