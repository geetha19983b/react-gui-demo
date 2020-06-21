import React from 'react';

class DeploymentInfo extends React.Component {
  renderAccountUI() {
    return (
      <div className="fields">
      <div className="eight wide field">
        <label>Functional Account Name</label>
        <input type="text" name="fnAccountName" placeholder="Account Name"
          value={this.props.fnAccountName}
          onChange={this.props.handleChange} />
      </div>
      <div className="eight wide field">
        <label>Functional Account Credentials</label>
        <input type="text" name="fnCredentials" placeholder="Credentails"
          value={this.props.fnCredentials}
          onChange={this.props.handleChange} />
      </div>
      </div>
    )
  }
  render() {
    if (this.props.currentStep !== 4) {
      return null
    }
    return (
      <div className="ui form mt-md-3">
        <h4 className="ui dividing header">Deployment Information</h4>
        <div className="fields">
          <label>Select your Deployment type:</label>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="deploymentType" value="Package"
                checked={this.props.deploymentType === "Package"}
                onChange={this.props.handleChange} />
              <label>Package</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="deploymentType" value="Distribution"
                checked={this.props.deploymentType === "Distribution"}
                onChange={this.props.handleChange} />
              <label>Distribution</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">

              <input type="radio" name="deploymentType" value="Install"
                checked={this.props.deploymentType === "Install"}
                onChange={this.props.handleChange} />
              <label> Install</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">

              <input type="radio" name="deploymentType" value="Download"
                checked={this.props.deploymentType === "Download"}
                onChange={this.props.handleChange} />
              <label>Download</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name="deploymentType" value="OfflineInstall"
                checked={this.props.deploymentType === "OfflineInstall"}
                onChange={this.props.handleChange} />
              <label>Offline Install</label>
            </div>
          </div>
        </div>
        {this.props.deploymentType && this.renderAccountUI()}
        <div className="fields float-right">
          <div className="eight wide field">
            <button className="ui green button">Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default DeploymentInfo;