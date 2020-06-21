import {
  GET_CONFIGURATION, START_FETCHING_CONFIGURATION,
  PREVIOUS, NEXT, HANDLE_CHANGE, ADD_SERVERGROUPS_SERVERS, HANDLE_SERVERGROUP_CHANGE,
  REMOVE_SERVERGROUP, SELECT_AVAILABLE_SOFWARE, SOFTWARE_ITEMS_MOVE_RIGHT, SOFTWARE_ITEMS_MOVE_ALL_RIGHT,
  SOFTWARE_ITEMS_MOVE_LEFT, SOFTWARE_ITEMS_MOVE_ALL_LEFT, SELECT_CHOOSEN_SOFTWARE, HANDLE_SERVER_CHANGE,
  REMOVE_SERVER
} from "../actions/types";


const INITIAL_STATE = {
  loading: true,
  currentStep: 1,
  fpmVersion: '',
  clientName: '',
  environmentName: '',
  nexusPath: '',
  nexusCred: '',
  deploymentDestination: '',
  noOfServerGroups: '',
  noOfServers: '',
  serverGroups: [],
  servers: [],
  deploymentType: '',
  fnAccountName: '',
  fnCredentials: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCHING_CONFIGURATION:
      return { ...state, loading: true };

    case GET_CONFIGURATION:
      //console.log(action.payload);
      //return { ...state, loading: false};
      return {...action.payload,loading:false}

    case PREVIOUS:
      return { ...state, currentStep: action.payload };

    case NEXT:
      return { ...state, currentStep: action.payload };

    case HANDLE_CHANGE:
      const { name, value } = action.payload.target;
      return { ...state, [name]: value };

    case ADD_SERVERGROUPS_SERVERS:
      const { servername, servervalue } = action.payload;
      if (servername === 'noOfServerGroups' && servervalue > 0) {
        return { ...state, serverGroups: addServerGroupsAndServers(servername, servervalue,state) };
      }
      if (servername === 'noOfServers' && servervalue > 0) {
        return { ...state, servers: addServerGroupsAndServers(servername, servervalue,state) };
      }
      return state;

    case HANDLE_SERVERGROUP_CHANGE:   
      return { ...state, serverGroups: handleServerGroupChange(action.payload,state) };

    case REMOVE_SERVERGROUP:
       return { ...state, serverGroups: removeServerGroups(action.payload, state) };

    case HANDLE_SERVER_CHANGE:
      return {
        ...state,
        servers: handleServerChange(action.payload, state)
      }
    case REMOVE_SERVER:
      
      return { ...state, servers: removeServers(action.payload, state) };

    case SELECT_AVAILABLE_SOFWARE:
      const { softwareAvailableIndex, selectedAvailableSoftware } = action.payload;

      return {
        ...state,
        serverGroups: selectAvailableSoftware(softwareAvailableIndex, selectedAvailableSoftware, state)
      };
    case SOFTWARE_ITEMS_MOVE_ALL_RIGHT:
      return {
        ...state,
        serverGroups: softwareItemsMoveAllRight(action.payload, state)
      };
    case SOFTWARE_ITEMS_MOVE_RIGHT:

      return { ...state, serverGroups: softwareItemsMoveRight(action.payload, state) };

    case SOFTWARE_ITEMS_MOVE_LEFT:
      let moveLeftServerGroups = softwareItemsMoveLeft(action.payload, state);
      return { ...state, serverGroups: moveLeftServerGroups };

    case SOFTWARE_ITEMS_MOVE_ALL_LEFT:
      return { ...state, serverGroups: softwareItemsMoveAllLeft(action.payload, state) };

    case SELECT_CHOOSEN_SOFTWARE:
      const { softwareChoosenIndex, selectedChoosenSoftware } = action.payload;

      return {
        ...state,
        serverGroups: selectChoosenSoftware(softwareChoosenIndex, selectedChoosenSoftware, state)
      };
    default:
      return state;
  }

}
function removeServerGroups(index, state) {
  let serverGroups = [...state.serverGroups];
  serverGroups.splice(index, 1);
  return serverGroups;
}
function removeServers(index, state) {
  let servers = [...state.servers];
  servers.splice(index, 1);
  return servers;
}
function handleServerGroupChange(payload,state){
  const { index, event } = payload;
  const { name, value } = event.target;
    let serverGroups = [...state.serverGroups];
    serverGroups[index] = { ...serverGroups[index], [name]: value };
    return serverGroups;
}
function handleServerChange(payload, state) {
  const { index, event } = payload;
  const { name, value } = event.target;
  let servers = [...state.servers];
  servers[index] = { ...servers[index], [name]: value };
  return servers;
}
function selectChoosenSoftware(i, value, state) {
  let serverGroups = [...state.serverGroups];
  let softwares = serverGroups[i].softwares;

  softwares.selectedChoosenSoftwares = value;

  serverGroups[i] = { ...serverGroups[i], softwares: softwares };
  return serverGroups;

}
function selectAvailableSoftware(i, value, state) {
  let serverGroups = [...state.serverGroups];
  let softwares = serverGroups[i].softwares;
  softwares.selectedAvailableSoftwares = value;

  serverGroups[i] = { ...serverGroups[i], softwares: softwares };
  return serverGroups;
}

function softwareItemsMoveAllLeft(i, state) {
  let serverGroups = [...state.serverGroups];
  let softwares = serverGroups[i].softwares;

  let availableSoftwares = [...softwares.availableSoftwares, ...softwares.choosenSoftwares];

  softwares.choosenSoftwares = [];
  softwares.availableSoftwares = availableSoftwares;
  softwares.selectedAvailableSoftwares = [];
  softwares.selectedChoosenSoftwares = [];

  serverGroups[i] = { ...serverGroups[i], softwares: softwares };
  return serverGroups;
}
function softwareItemsMoveAllRight(i, state) {
  let serverGroups = [...state.serverGroups];
  let softwares = serverGroups[i].softwares;

  let choosenSelectedSoftwares = [...softwares.choosenSoftwares, ...softwares.availableSoftwares];

  softwares.choosenSoftwares = choosenSelectedSoftwares;
  softwares.availableSoftwares = [];
  softwares.selectedAvailableSoftwares = [];
  softwares.selectedChoosenSoftwares = [];

  serverGroups[i] = { ...serverGroups[i], softwares: softwares };
  return serverGroups;
}

function softwareItemsMoveRight(i, state) {
  let serverGroups = [...state.serverGroups];
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

  return serverGroups;
}
function softwareItemsMoveLeft(i, state) {
  let serverGroups = [...state.serverGroups];
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
  return serverGroups;
}
function addServerGroupsAndServers(name, value,state) {
  if (name === 'noOfServerGroups' && value > 0) {
    let serverGroups = [];
    for (let i = 1; i <=  state.noOfServerGroups; i++) {
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
    return serverGroups;
  }
  if (name === 'noOfServers' && value > 0) {
    let servers = [];
    for (let i = 1; i <= state.noOfServers; i++) {
      servers.push({ serverId: `SRVR_${i}`, serverName: "", serverIpAddress: "" })
    }
    return servers;
  }
}
