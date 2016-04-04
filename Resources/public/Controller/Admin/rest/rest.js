import "isomorphic-fetch";
import reduxApi from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import { RECEIVE_REPORT_DATA } from "../actions/reportData";
import ReportDataTransformer from "./transformers/ReportDataTransformer";

const URL = "http://lionbi-cifren.c9users.io";

export default reduxApi({
  restReportDatas: {
    url: `${URL}/api/v1/reportdatas.json`,
    transformer: ReportDataTransformer.reportDatas(),
    options: {
      header: {
        "Accept": "application/json"
      }
    }
  },
  restReportDataCrud: {  //all except POST
    url: `${URL}/api/v1/reportdatas/:id.json`,
    crud: true,
    transformer: ReportDataTransformer.reportData(),
    options: {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  },
  restReportDataPost: {
    url: `${URL}/api/v1/reportdatas.json`,
    transformer: ReportDataTransformer.reportData(),
    options: {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }
  }
}).use("fetch", adapterFetch(fetch)); // it's necessary to point using REST backend