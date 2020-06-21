import { combineReducers } from 'redux';
import configurationReducer from "./configuration";

export default combineReducers({
  configuration: configurationReducer
});