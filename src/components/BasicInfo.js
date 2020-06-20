import React from 'react';


class BasicInfo extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null
    }
    return (
      <div >
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
       </div>
      </div>
    );
  }
}
export default BasicInfo;
