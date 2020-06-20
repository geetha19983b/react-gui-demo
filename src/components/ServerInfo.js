import React from 'react';

class ServerInfo extends React.Component {
  createServerGroupUI() {
    return this.props.serverGroups.map((el, i) => (
      <div key={i} className="serverGroupList">
        <input placeholder="Server Group Name" name="serverGroupName"
          className="mr-md-3"
          value={el.serverGroupName || ''} onChange={this.props.handleServerGroupChange.bind(this, i)} />

        <button className='ui red button' value='remove'
          onClick={this.props.removeServerGroupClick.bind(this, i)}>
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
          value={el.serverName || ''} onChange={this.props.handleServerChange.bind(this, i)} />

        <input placeholder="ServerIpAddress" name="serverIpAddress"
          className="mr-md-3"
          value={el.serverIpAddress || ''} onChange={this.props.handleServerChange.bind(this, i)} />

        <select onChange={this.props.handleServerChange.bind(this, i)}
          value={el.serverGroupName || ''} name="serverGroupName" className="mr-md-3">
          <option value="-1">Select</option>
          {
             this.props.serverGroups.map((el, i) => {
              return <option key={i} value={el.serverGroupName}>{el.serverGroupName}</option>
            })
          }
        </select>

        <button className='ui red button' value='remove'
          onClick={this.props.removeServerClick.bind(this, i)}>
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
              onChange={this.props.handleChange} />
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
              onChange={this.props.handleChange} />
          </div>
        </div>
        <div className="fields">
          <div className="eight wide field">
            {this.props.noOfServers > 0 && this.createServerUI()}
          </div>

        </div>
        <div className="fields float-right">
          <div className="eight wide field">
            <button className="ui green button">Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ServerInfo;