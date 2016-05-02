import rest from "../rest/rest.js";

export function getReport(id) {
  return (dispatch) => {
    dispatch(rest.actions.reportConfig_Get.sync({id}));
  };
}
export function patchReport(id, data) {
  return (dispatch) => {
    dispatch(rest.actions.reportConfig_Patch(
      {id},
      { body: JSON.stringify({"reportConfig": data})}
    ));
  };
}
export function getReportData(id) {
  return (dispatch) => {
    dispatch(rest.actions.reportData_Get({id}));
  };
}
export function getFilters(parent){
  return (dispatch) => {
    dispatch(rest.actions.reportFilter_CGet({parent}));
  };
}
export function updateFilter(id, data) {
  return (dispatch) => {
    dispatch(rest.actions.reportFilter_Patch(
      {id},
      { body: JSON.stringify({"reportFilter": data})}
    ));
  };
}
export function createFilter(data, cb) {
  return (dispatch) => {
    dispatch(rest.actions.reportFilter_Post(
      {},
      { body: JSON.stringify({"reportFilter": data})}, 
      cb
    ));
  };
}
export function deleteFilter(id) {
  return (dispatch) => {
    dispatch(rest.actions.reportFilter_Delete(
      {id}
    ));
  };
}
export function getModules(parent){
  return (dispatch) => {
    dispatch(rest.actions.reportModule_CGet({parent}));
  };
}
