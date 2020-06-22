import React from 'react';
import { connect } from "react-redux";
import * as configurationActions from "../actions/configuration";

class StepsInfo extends React.Component {
  render() {
    return (
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
            <div className="description">Enter deployment details</div>
          </div>
        </div>
        <div className={this.props.currentStep === 5 ? 'active step' : 'step'}>
        <i className="paper plane icon"></i>
        <div className="content">
          <div className="title">Execution</div>
          <div className="description">Script Execution Report</div>
        </div>
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
)(StepsInfo);
