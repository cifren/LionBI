import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import rest from "../rest/rest";
import {reportAdminConfig, dataAdminConfig} from './adminConfigReducer';
import {moduleTable} from './moduleTableEditReducer';
import {poolReducer, rest as restAdminConfig} from 'sound-admin';

const rootReducer = combineReducers(
  Object.assign({}, {
    routing: routerReducer,
    reportAdminConfig,
    dataAdminConfig,
    poolReducer,
    moduleTable
  }, 
  rest.reducers, 
  restAdminConfig.reducers
));

export default rootReducer;