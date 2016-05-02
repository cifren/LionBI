import rest from "../rest/rest.js";

export const ADD_COLUMN = "ADD_COLUMN";
export const UPDATE_COLUMN_COUNT = "UPDATE_COLUMN_COUNT";

export function addColumn(){
  return {
    type: ADD_COLUMN
  }
}

export function updateColumnCount(count){
  return {
    type: UPDATE_COLUMN_COUNT,
    columnCount: count
  }
}