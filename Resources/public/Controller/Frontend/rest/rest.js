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

export default reduxApi({
  reportConfig_CGet: {
    url: URL + "/" + reportConfigRestName,
    transformer: transformers.array,
    options: JSON_OPTIONS
  },
}).use("fetch", adapterFetch(fetch)); // it's necessary to point using REST backend