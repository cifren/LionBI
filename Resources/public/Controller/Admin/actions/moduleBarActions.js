import rest from "../rest/rest.js";
import uniqId from "../model/uniqId";

export const INITIALIZE_DEF = "INITIALIZE_DEF";
export const UPDATE_VALUE = "UPDATE_VALUE";
export const ADD_DATASET = "ADD_DATASET";

export function updateValue(name, value){
  return {
    type: UPDATE_VALUE,
    name,
    value
  };
}

export function addDataset(){
  return {
    type: ADD_DATASET
  };
}

export function initializeDef(barDef){
  return {
    type: INITIALIZE_DEF,
    barDef
  };
}

export function getBar(id) {
  return (dispatch) => {
    dispatch(rest.actions.reportBar_Get({id}));
  };
}

export function createBar(reportDefinitionId) {
  return (dispatch) => {
    dispatch(rest.actions.reportBar_Post(
      {},
      { body: JSON.stringify({"displayId": uniqId(10), "reportConfig": reportDefinitionId})}
    ));
  };
}

export function updateBar(barDef){
  return (dispatch) => {
    var request = Object.assign({}, barDef);
    delete request.report_config;
    dispatch(rest.actions.reportBar_Patch(
      {id: barDef.id},
      { body: JSON.stringify(request)}
    ));
  };
}

export function getDataIds(reportConfigId){
  return (dispatch) => {
    dispatch(rest.actions.reportConfig_Get(
      {id: reportConfigId},
      {},
      (err, data)=>{
        dispatch(rest.actions.reportData_Get_columns(
          {id: data.lnb_report_data.id}
        ));
      }
    ));
  };
}