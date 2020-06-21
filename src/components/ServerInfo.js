import React from 'react';
import { connect } from "react-redux";
import * as configurationActions from "../actions/configuration";

class ServerInfo extends React.Component {
  handleChange = event => {
    this.props.handleChange(event)
    const { name, value } = event.target
   
    if (name === 'noOfServerGroups' && value > 0) {
      const data = {
        servername: name,
        servervalue: value
      };
      this.props.addServerGroupsAndServers(data);
    }
    if (name === 'noOfServers' && value > 0) {
      const data = {
        servername: name,
        servervalue: value
      };
      this.props.addServerGroupsAndServers(data);
    }
  }
  createServerGroupUI() {
    return this.props.serverGroups.map((el, i) => (
      <div key={i} className="serverGroupList">
        <input placeholder="Server Group Name" name="serverGroupName"
          className="mr-md-3"
          value={el.serverGroupName || ''} onChange={(e) => this.props.handleServerGroupChange(i,e)} />

        <button className='ui red button' value='remove'
          onClick={(e) => this.props.removeServerGroup(i)}>
          Remove
         </button>
      </div>
    ));
  }
  createServerUI() {
    return this.props.servers.map((el, i) => (
      <div key={i} className="serverGroupList">
        <input placeholder="ServerName" name="serverName"
          className="mr-md-3"
          value={el.serverName || ''} onChange={(e) => this.props.handleServerChange(i,e)} />

        <input placeholder="ServerIpAddress" name="serverIpAddress"
          className="mr-md-3"
          value={el.serverIpAddress || ''} onChange={(e) => this.props.handleServerChange(i,e)} />

        <select onChange={(e) => this.props.handleServerChange(i,e)}
          value={el.serverGroupName || ''} name="serverGroupName" className="mr-md-3">
          <option value="-1">Select</option>
          {
             this.props.serverGroups.map((el, i) => {
              return <option key={i} value={el.serverGroupName}>{el.serverGroupName}</option>
            })
          }
        </select>

        <button className='ui red button' value='remove'
          onClick={() => this.props.removeServer(i)}>
          Remove
         </button>
      </div>
    ));
  }
  render() {
    if (this.props.currentStep !== 2) {
      return null
    }
    return (
      <div className="ui form mt-md-3">
        <h4 className="ui dividing header">Server Information</h4>
        <div className="fields">
          <div className="eight wide field">
            <label>Number of Server Groups</label>
            <input type="text" name="noOfServerGroups" placeholder="No of Server Groups"
              value={this.props.noOfServerGroups}
              onChange={this.handleChange} />
          </div>

        </div>
        <div className="fields">
          <div className="eight wide field">
            {this.props.noOfServerGroups > 0 && this.createServerGroupUI()}
          </div>
        </div>
        <div className="fields">
          <div className="eight wide field">
            <label>Number of Servers</label>
            <input type="text" name="noOfServers" placeholder="No of Servers"
              value={this.props.noOfServers}
              onChange={this.handleChange} />
          </div>
        </div>
        <div className="fields">
          <div className="eight wide field">
            {this.props.noOfServers > 0 && this.createServerUI()}
          </div>

        </div>
       
      </div>
    )
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
)(ServerInfo);
