import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reportAdminConfig} from "./reportConfigReducers";
import rest from "../rest/rest";

const rootReducer = combineReducers(
  Object.assign({}, {
    routing: routerReducer,
    reportAdminConfig
  },
  rest.reducers
));

export default rootReducer;