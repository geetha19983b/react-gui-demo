import {
  GET_CONFIGURATION, START_FETCHING_CONFIGURATION,
  PREVIOUS, NEXT, HANDLE_CHANGE, ADD_SERVERGROUPS_SERVERS, HANDLE_SERVERGROUP_CHANGE,
  REMOVE_SERVERGROUP, SELECT_AVAILABLE_SOFWARE, SOFTWARE_ITEMS_MOVE_RIGHT,
  SOFTWARE_ITEMS_MOVE_ALL_RIGHT,SOFTWARE_ITEMS_MOVE_LEFT,SOFTWARE_ITEMS_MOVE_ALL_LEFT,
  SELECT_CHOOSEN_SOFTWARE, HANDLE_SERVER_CHANGE,REMOVE_SERVER,
  START_SCRIPT_EXECUTION,SCRIPT_EXECUTION_STATUS
} from "../actions/types";
const { ipcRenderer } = window.require("electron");

export const startFetchingConfiguration = () => {
  return { type: START_FETCHING_CONFIGURATION };
};

export const getConfiguration = () => dispatch => {
  ipcRenderer.send("configuration:get");
  ipcRenderer.on("configuration:list", (event, configuration) => {
    dispatch({ type: GET_CONFIGURATION, payload: configuration });
  });
};

export const startScriptExecution = () => {
  return { type: START_SCRIPT_EXECUTION };
};

export const getScriptExecutionStatus = () => (dispatch,getState) => {
  const configData = getState().configuration;
  ipcRenderer.send("scriptExecution:start",configData);
  ipcRenderer.on("scriptExecution:status", (event, message) => {
    dispatch({ type: SCRIPT_EXECUTION_STATUS, payload: message });
  });

}
export const previous = (step) => {
  return { type: PREVIOUS, payload: step };
}

export const next = (step) => {
  return { type: NEXT, payload: step };
}

export const handleChange = (event) => {
  return { type: HANDLE_CHANGE, payload: event };
}

export const addServerGroupsAndServers = (data) => {
  return { type: ADD_SERVERGROUPS_SERVERS, payload: data }
}

export const handleServerGroupChange = (index, event) => {
  return {
    type: HANDLE_SERVERGROUP_CHANGE, payload: {
      index,
      event
    }
  };
}
export const handleServerChange = (index,event) => {
  return {
    type:HANDLE_SERVER_CHANGE,
    payload: {
      index,event
    }
  }
}

export const removeServer = (index) => {
  return {
    type:REMOVE_SERVER,
    payload:index
  }
}
export const removeServerGroup = (index) => {
  return {
    type: REMOVE_SERVERGROUP, payload: index
     
  }
};

export const selectAvailableSoftware = (index, value) => {
  return {
    type: SELECT_AVAILABLE_SOFWARE, payload: {
      softwareAvailableIndex: index,
      selectedAvailableSoftware: value
    }
  }
}

export const selectChoosenSoftware = (index,value) => {
  return {
    type:SELECT_CHOOSEN_SOFTWARE,payload:{
      softwareChoosenIndex: index,
      selectedChoosenSoftware: value
    }
  }
}

export const softwareItemsMoveRight = (index) => {
  return {
    type: SOFTWARE_ITEMS_MOVE_RIGHT, payload: index
  }
}

export const softwareItemsMoveAllRight = (index) => {
  return {
    type: SOFTWARE_ITEMS_MOVE_ALL_RIGHT,
    payload: index
  }
}

export const softwareItemsMoveLeft = (index) => {
  return {
    type:SOFTWARE_ITEMS_MOVE_LEFT,payload:index
  }
}

export const softwareItemsMoveAllLeft = (index) => {
  return {
    type:SOFTWARE_ITEMS_MOVE_ALL_LEFT,payload:index
  }
}

