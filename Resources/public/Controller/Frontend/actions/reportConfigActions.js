import rest from "../rest/rest.js";

export const UPDATE_REPORT_LIST = "UPDATE_REPORT_LIST";

export function getReportList() {
  return (dispatch) => {
    dispatch(rest.actions.reportConfig_CGet());
  };
}

export function updateReportList(list){
  return {
    type: UPDATE_REPORT_LIST,
    list
  };
}