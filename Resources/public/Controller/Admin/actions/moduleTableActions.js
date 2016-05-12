import rest from "../rest/rest.js";
import uniqId from "../model/uniqId";

export const ADD_COLUMN = "ADD_COLUMN";
export const UPDATE_COLUMN_COUNT = "UPDATE_COLUMN_COUNT";
export const UPDATE_MODULE = "UPDATE_MODULE";
export const UPDATE_DISPLAY_ID = "UPDATE_DISPLAY_ID";
export const INITIALIZE_COLUMN = "INITIALIZE_COLUMN";
export const UPDATE_COLUMN_LIST = "UPDATE_COLUMN_LIST";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export function updateColumnList(columnList){
  return {
    type: UPDATE_COLUMN_LIST,
    columnList
  };
}

export function updateCategory(key, category){
  return {
    type: UPDATE_CATEGORY,
    key, category
  };
}

export function updateDisplayId(displayId){
  return {
    type: UPDATE_DISPLAY_ID,
    displayId
  };
}

export function addColumn(){
  return {
    type: ADD_COLUMN
  };
}

export function initializeColumn(tableDef){
  return {
    type: INITIALIZE_COLUMN,
    tableDef
  };
}

export function updateColumnCount(count){
  return {
    type: UPDATE_COLUMN_COUNT,
    columnCount: count
  };
}

export function getTable(id) {
  return (dispatch) => {
    dispatch(rest.actions.reportTable_Get({id}));
  };
}

export function createTable(reportDefinitionId) {
  return (dispatch) => {
    dispatch(rest.actions.reportTable_Post(
      {},
      { body: JSON.stringify({"displayId": uniqId(10), "reportConfig": reportDefinitionId})}
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