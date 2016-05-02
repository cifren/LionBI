import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import parameters from "../app/parameters"

const URL = parameters.api.url;
const JSON_OPTIONS = {
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
};
const reportConfigRestName = parameters.api.resources.reportConfig;
const reportDataRestName = parameters.api.resources.reportData;
const reportFilterRestName = parameters.api.resources.reportFilter;
const reportModuleRestName = parameters.api.resources.reportModule;

export default reduxApi({
  reportConfig_Get: {
    url: URL + "/" + reportConfigRestName + "/:id",
    transformer: transformers.object,
    options: JSON_OPTIONS
  },
  reportConfig_Patch: {
    url: URL + "/" + reportConfigRestName + "/:id",
    transformer: transformers.object,
    options: {...JSON_OPTIONS, method: "PATCH"}
  },
  reportData_Get: {
    url: URL + "/" + reportDataRestName + "/:id",
    transformer: transformers.object,
    options: JSON_OPTIONS
  },
  reportData_Get_columns: {
    url: URL + "/" + reportDataRestName + "/:id/columns",
    transformer: transformers.object,
    options: JSON_OPTIONS
  },
  reportFilter_CGet: {
    url: URL + "/" + reportFilterRestName,
    transformer: transformers.array,
    options: JSON_OPTIONS
  },
  reportFilter_Post: {
    url: URL + "/" + reportFilterRestName,
    transformer: transformers.object,
    options: {...JSON_OPTIONS, method: "POST"}
  },
  reportFilter_Patch: {
    url: URL + "/" + reportFilterRestName + "/:id",
    transformer: transformers.object,
    options: {...JSON_OPTIONS, method: "PATCH"}
  },
  reportFilter_Delete: {
    url: URL + "/" + reportFilterRestName + "/:id",
    transformer: transformers.object,
    options: {...JSON_OPTIONS, method: "DELETE"}
  },
  reportModule_CGet: {
    url: URL + "/" + reportModuleRestName,
    transformer: transformers.array,
    options: JSON_OPTIONS
  },
}).use("fetch", adapterFetch(fetch)); // it's necessary to point using REST backend