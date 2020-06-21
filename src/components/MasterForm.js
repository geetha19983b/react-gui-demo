import React from 'react';
import { connect } from "react-redux";
import { BounceLoader } from "react-spinners";
import BasicInfo from './BasicInfo';
import ServerInfo from './ServerInfo';
import SoftwareInfo from './SoftwareInfo';
import DeploymentInfo from './DeploymentInfo';
import * as configurationActions from "../actions/configuration";

class MasterForm extends React.Component {

  
  handleSubmit = event => {
    event.preventDefault()
    //const { fpmVersion, clientName, environmentName, nexusPath, nexusCred,
    // noOfServerGroups, noOfServers } = this.state
    console.log(JSON.stringify(this.props));
  }

  _next = () => {
    let currentStep = this.props.currentStep
    currentStep = currentStep >= 3 ? 4 : currentStep + 1
    this.props.next(currentStep);
  }

  _prev = () => {
    let currentStep = this.props.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.props.previous(currentStep);
  }

  /*
  * the functions for our button
  */
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
    if (currentStep < 4) {
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
      <div>
        <div className="ui steps mt-md-3">
          <div className={this.props.currentStep === 1 ? 'active step' : 'step'}>
            <i className="clipboard icon"></i>
            <div className="content">
              <div className="title">Basic</div>
              <div className="description">Enter basic info</div>
            </div>
          </div>
          <div className={this.props.currentStep === 2 ? 'active step' : 'step'}>
            <i className="sitemap icon"></i>
            <div className="content">
              <div className="title">Server</div>
              <div className="description">Enter Server details</div>
            </div>
          </div>
          <div className={this.props.currentStep === 3 ? 'active step' : 'step'}>
            <i className="desktop icon"></i>
            <div className="content">
              <div className="title">Software</div>
              <div className="description">Choose Software</div>
            </div>
          </div>
          <div className={this.props.currentStep === 4 ? 'active step' : 'step'}>
            <i className="thumbtack icon"></i>
            <div className="content">
              <div className="title">Deployment</div>
              <div className="description">Enter deployment related details</div>
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <BasicInfo />
          <ServerInfo />
          <SoftwareInfo />
          <DeploymentInfo />
          <div className="mt-md-5">
            {this.previousButton()}
            {this.nextButton()}
          </div>
          <div className="fields float-right">
            <div className="eight wide field">
              <button className="ui green button">Submit</button>
            </div>
          </div>

        </form>
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

