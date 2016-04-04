import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reportDataEdit, reportDataList} from './reportData';
import rest from "../rest/rest";
import {reportAdminConfig} from './reportConfigReducer';
import {pool as poolReducer} from '../modules/Admin/reducers/adminReducer';
import restAdminConfig from "../modules/Admin/rests/rest";

const rootReducer = combineReducers(Object.assign({}, {
  reportDataEdit,
  reportDataList,
  routing: routerReducer,
  reportAdminConfig,
  poolReducer
}, rest.reducers, restAdminConfig.reducers));

export default rootReducer;