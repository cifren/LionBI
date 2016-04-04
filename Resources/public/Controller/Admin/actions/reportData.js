import rest from "../rest/rest.js";
import { push } from "react-router-redux";

export const DELETE_REPORT_DATA = "DELETE_REPORT_DATA";
export const RECEIVE_REPORT_DATA = "RECEIVE_REPORT_DATA";

export function deleteReportData(reportData) {
  return {
    type: DELETE_REPORT_DATA,
    reportData
  };
}

export function fetchReportDatas() {
  return (dispatch) => {
    dispatch(rest.actions.restReportDatas());
  };
}

export function fetchReportData(id) {
  return (dispatch) => {
    dispatch(rest.actions.restReportDataCrud({id}));
  };
}

export function resetReportData(){
  return (dispatch) => {
    dispatch(rest.actions.restReportDataCrud.reset());
    dispatch(rest.actions.restReportDataPost.reset());
  };
}

export function postReportData(reportData) {
  return (dispatch, getState) => {
    dispatch(rest.actions.restReportDataPost(
      {},
      { body: JSON.stringify({report_data: {displayName: reportData.displayName}}) }
    ));
  };
}

export function putReportData(reportData) {
  return (dispatch) => {
    dispatch(rest.actions.restReportDataCrud.put(
      {id: reportData.id},
      { body: JSON.stringify({report_data: {displayName: reportData.displayName}}) }
    ));
  };
}

export function deleteReportData(id) {
  return (dispatch) => {
    dispatch(rest.actions.restReportDataCrud.delete({id}));
  };
}

export function adaptRequestJsonToObject(reportDataRequest){
  const reportData = {
    id: reportDataRequest.id,
    displayName: reportDataRequest.display_name
  };
  return reportData;
}

export function loadEmptyReportData(){
  return {
    id: null,
    displayName: null
  };
}

export function redirectPath(path){
  return (dispatch) => {
    dispatch(push(path));
  };
}