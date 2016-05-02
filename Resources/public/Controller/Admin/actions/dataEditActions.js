import rest from "../rest/rest.js";

export function getColumns(id) {
  return (dispatch) => {
    dispatch(rest.actions.reportData_Get_columns({id}));
  };
}