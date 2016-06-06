import rest from "../rest/rest.js";
import uniqId from "../model/uniqId";
import Transformer from "../components/ModuleTableEdit/Transformer/TableDefToColumnListTransformer";

export const ADD_COLUMN = "ADD_COLUMN";
export const UPDATE_VALUE = "UPDATE_VALUE";
export const UPDATE_TABLEDEF = "UPDATE_TABLEDEF";
export const INITIALIZE_COLUMN = "INITIALIZE_COLUMN";
export const UPDATE_COLUMN_LIST = "UPDATE_COLUMN_LIST";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_ROW = "UPDATE_ROW";

export function updateTableDef(tableDef){
  return {
    type: UPDATE_TABLEDEF,
    tableDef
  };
}

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

export function updateRow(key, row){
  return {
    type: UPDATE_ROW,
    key, row
  };
}

export function update(name, value){
  return {
    type: UPDATE_VALUE,
    name,
    value
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

export function updateTable(columnList, previousTableDef){
  var tableDef = Transformer.reverseTransform(columnList, previousTableDef);
  
  return (dispatch) => {
    var request = Object.assign({}, tableDef);
    delete request.report_config;
    dispatch(rest.actions.reportTable_Patch(
      {id: tableDef.id},
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