import React from 'react';


class BasicInfo extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null
    }
    return (
      <div className="ui form mt-md-3">
        <h4 className="ui dividing header">General Information</h4>
        <div className="fields">
          <div className="eight wide field">
            <label>FPM Version</label>
            <input type="text" name="fpmVersion" placeholder="FPM Version #"
              value={this.props.fpmVersion}
              onChange={this.props.handleChange} />
          </div>
          <div className="eight wide field">
            <label>Client Name</label>
            <input type="text" name="clientName" placeholder="Client Name"
              value={this.props.clientName}
              onChange={this.props.handleChange} />
          </div>
        </div>
        <div className="fields">
          <div className="four wide field">
            <label>Environment Name</label>
            <input type="text" name="environmentName" placeholder="Environment Name"
              value={this.props.environmentName}
              onChange={this.props.handleChange} />
          </div>
          <div className="six wide field">
            <label>Nexus Path</label>
            <input type="text" placeholder="Nexus Path" name="nexusPath"
              value={this.props.nexusPath}
              onChange={this.props.handleChange} />
          </div>
          <div className="six wide field">
            <label>Nexus Credential</label>
            <input type="text" placeholder="Nexus Credential" name="nexusCred"
              value={this.props.nexusCred}
              onChange={this.props.handleChange} />
          </div>
        </div>
        <div className="fields">
          <label>Select your Deployment destination:</label>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="deploymentDestination" value="AWS"
                checked={this.props.deploymentDestination === "AWS"}
                onChange={this.props.handleChange} />
              <label>AWS</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="deploymentDestination" value="OnPremise"
                checked={this.props.deploymentDestination === "OnPremise"}
                onChange={this.props.handleChange} />
              <label>OnPremise</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BasicInfo;
