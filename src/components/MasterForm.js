import React from 'react';
import BasicInfo from './BasicInfo';
import ServerInfo from './ServerInfo';
import SoftwareInfo from './SoftwareInfo';
import DeploymentInfo from './DeploymentInfo';

class MasterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      fpmVersion: '',
      clientName: '',
      environmentName: '',
      nexusPath: '',
      nexusCred: '',
      deploymentDestination:'',
      noOfServerGroups: '',
      noOfServers: '',
      // serverGroups: [{ serverGroupId: "", serverGroupName: "" }]
      serverGroups: [],
      servers: [],
      deploymentType: '',
      fnAccountName:'',
      fnCredentials:''
    }
  }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    }, () => this.addServerGroupsAndServers(name, value));
  }

  addServerGroupsAndServers = (name, value) => {
    if (name === 'noOfServerGroups' && value > 0) {
      let serverGroups = [];
      for (let i = 1; i <= this.state.noOfServerGroups; i++) {
        serverGroups.push({
          serverGroupId: `SG_${i}`, serverGroupName: "", softwares: {
            availableSoftwares: [{ "id": 1, "name": 'winzip' }, { "id": 2, "name": 'node' },
            { "id": 3, "name": '7-zip' }, { "id": 4, "name": 'java' }, { "id": 5, "name": '.net core' }],
            choosenSoftwares: [],
            selectedAvailableSoftwares: [],
            selectedChoosenSoftwares: []
          }
        })
      }
      this.setState({ ...this.state, serverGroups: serverGroups });
    }
    if (name === 'noOfServers' && value > 0) {
      let servers = [];
      for (let i = 1; i <= this.state.noOfServers; i++) {
        servers.push({ serverId: `SRVR_${i}`, serverName: "", serverIpAddress: "" })
      }
      this.setState({ ...this.state, servers: servers });
    }
  }
  handleServerGroupChange = (i, e) => {
    const { name, value } = e.target;
    let serverGroups = [...this.state.serverGroups];
    serverGroups[i] = { ...serverGroups[i], [name]: value };
    this.setState({ ...this.state, serverGroups: serverGroups });
  }

  removeServerGroupClick = (i, event) => {
    event.preventDefault();
    let serverGroups = [...this.state.serverGroups];
    serverGroups.splice(i, 1);
    this.setState({ ...this.state, serverGroups: serverGroups });
  }

  onSoftwareAvailableSelect = (i, value) => {
    let serverGroups = [...this.state.serverGroups];
    let softwares = serverGroups[i].softwares;
    softwares.selectedAvailableSoftwares = value;

    serverGroups[i] = { ...serverGroups[i], softwares: softwares };
    this.setState({ ...this.state, serverGroups: serverGroups });
  }

  ItemsMoveRight = (i) => {
    let serverGroups = [...this.state.serverGroups];
    let softwares = serverGroups[i].softwares;

    let availableSoftwares = softwares.availableSoftwares
      .filter(software => !softwares.selectedAvailableSoftwares.includes(software.id));

    let choosenSoftwares = softwares.availableSoftwares
      .filter(software => softwares.selectedAvailableSoftwares.includes(software.id));

    let choosenSelectedSoftwares = [...softwares.choosenSoftwares, ...choosenSoftwares];

    softwares.choosenSoftwares = choosenSelectedSoftwares;
    softwares.availableSoftwares = availableSoftwares;
    softwares.selectedAvailableSoftwares = [];

    serverGroups[i] = { ...serverGroups[i], softwares: softwares };

    this.setState({ ...this.state, serverGroups: serverGroups });
  }
  ItemsMoveAllRight = (i) => {
    let serverGroups = [...this.state.serverGroups];
    let softwares = serverGroups[i].softwares;

    let choosenSelectedSoftwares = [...softwares.choosenSoftwares, ...softwares.availableSoftwares];

    softwares.choosenSoftwares = choosenSelectedSoftwares;
    softwares.availableSoftwares = [];
    softwares.selectedAvailableSoftwares = [];
    softwares.selectedChoosenSoftwares = [];

    serverGroups[i] = { ...serverGroups[i], softwares: softwares };

    this.setState({ ...this.state, serverGroups: serverGroups });

  }
  ItemsMoveLeft = (i) => {
    let serverGroups = [...this.state.serverGroups];
    let softwares = serverGroups[i].softwares;

    let choosenSoftwares = softwares.choosenSoftwares
      .filter(software => !softwares.selectedChoosenSoftwares.includes(software.id));

    let availableSoftwares = softwares.choosenSoftwares
      .filter(software => softwares.selectedChoosenSoftwares.includes(software.id));

    let availableSelectedSoftwares = [...softwares.availableSoftwares, ...availableSoftwares];

    softwares.choosenSoftwares = choosenSoftwares;
    softwares.availableSoftwares = availableSelectedSoftwares;
    softwares.selectedAvailableSoftwares = [];
    softwares.selectedChoosenSoftwares = [];

    serverGroups[i] = { ...serverGroups[i], softwares: softwares };

    this.setState({ ...this.state, serverGroups: serverGroups });
  }
  ItemsMoveAllLeft = (i) => {
    let serverGroups = [...this.state.serverGroups];
    let softwares = serverGroups[i].softwares;

    let availableSoftwares = [...softwares.availableSoftwares, ...softwares.choosenSoftwares];

    softwares.choosenSoftwares = [];
    softwares.availableSoftwares = availableSoftwares;
    softwares.selectedAvailableSoftwares = [];
    softwares.selectedChoosenSoftwares = [];

    serverGroups[i] = { ...serverGroups[i], softwares: softwares };

    this.setState({ ...this.state, serverGroups: serverGroups });
  }
  onSoftwareChoosenSelect = (i, value) => {
    let serverGroups = [...this.state.serverGroups];
    let softwares = serverGroups[i].softwares;

    softwares.selectedChoosenSoftwares = value;

    serverGroups[i] = { ...serverGroups[i], softwares: softwares };
    this.setState({ ...this.state, serverGroups: serverGroups });
  }

  handleServerChange = (i, e) => {
    const { name, value } = e.target;
    let servers = [...this.state.servers];
    servers[i] = { ...servers[i], [name]: value };
    this.setState({ ...this.state, servers: servers });
  }

  removeServerClick = (i, event) => {
    event.preventDefault();
    let servers = [...this.state.servers];
    servers.splice(i, 1);
    this.setState({ ...this.state, servers: servers });
  }

  handleSubmit = event => {
    event.preventDefault()
    //const { fpmVersion, clientName, environmentName, nexusPath, nexusCred,
    // noOfServerGroups, noOfServers } = this.state
    console.log(JSON.stringify(this.state));
    // alert(`detail: \n 
    //        fpmVersion: ${fpmVersion} \n 
    //        clientName: ${clientName} \n
    //        environmentName: ${environmentName} \n
    //        nexusPath:${nexusPath} \n 
    //        nexusCred:${nexusCred} \n
    //        noOfServerGroups:${noOfServerGroups}\n
    //        noOfServers:${noOfServers}`);
  }

  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 3 ? 4 : currentStep + 1
    this.setState({
      currentStep: currentStep
    });
  }

  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
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
    let currentStep = this.state.currentStep;
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

  render() {
    return (
      <div>
        <div className="ui steps mt-md-3">
          <div className={this.state.currentStep === 1 ? 'active step' : 'step'}>
            <i className="clipboard icon"></i>
            <div className="content">
              <div className="title">Basic</div>
              <div className="description">Enter basic info</div>
            </div>
          </div>
          <div className={this.state.currentStep === 2 ? 'active step' : 'step'}>
            <i className="sitemap icon"></i>
            <div className="content">
              <div className="title">Server</div>
              <div className="description">Enter Server details</div>
            </div>
          </div>
          <div className={this.state.currentStep === 3 ? 'active step' : 'step'}>
            <i className="desktop icon"></i>
            <div className="content">
              <div className="title">Software</div>
              <div className="description">Choose Software</div>
            </div>
          </div>
          <div className={this.state.currentStep === 4 ? 'active step' : 'step'}>
            <i className="thumbtack icon"></i>
            <div className="content">
              <div className="title">Deployment</div>
              <div className="description">Enter deployment related details</div>
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <BasicInfo currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            fpmVersion={this.state.fpmVersion}
            clientName={this.state.clientName}
            environmentName={this.state.environmentName}
            nexusPath={this.state.nexusPath}
            nexusCred={this.state.nexusCred}
            deploymentDestination={this.state.deploymentDestination} />

          <ServerInfo currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            noOfServerGroups={this.state.noOfServerGroups}
            noOfServers={this.state.noOfServers}
            serverGroups={this.state.serverGroups}
            servers={this.state.servers}
            handleServerGroupChange={this.handleServerGroupChange}
            removeServerGroupClick={this.removeServerGroupClick}
            handleServerChange={this.handleServerChange}
            removeServerClick={this.removeServerClick}
          />

          <SoftwareInfo currentStep={this.state.currentStep}
            noOfServerGroups={this.state.noOfServerGroups}
            serverGroups={this.state.serverGroups}
            onSoftwareAvailableSelect={this.onSoftwareAvailableSelect}
            onSoftwareChoosenSelect={this.onSoftwareChoosenSelect}
            ItemsMoveRight={this.ItemsMoveRight}
            ItemsMoveAllRight={this.ItemsMoveAllRight}
            ItemsMoveLeft={this.ItemsMoveLeft}
            ItemsMoveAllLeft={this.ItemsMoveAllLeft} />

          <DeploymentInfo currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            deploymentType={this.state.deploymentType}
            fnAccountName={this.state.fnAccountName}
            fnCredentials={this.state.fnCredentials}
          />
          <div className="mt-md-5">
            {this.previousButton()}
            {this.nextButton()}
          </div>

        </form>
      </div>
    );
  }
}
export default MasterForm;

