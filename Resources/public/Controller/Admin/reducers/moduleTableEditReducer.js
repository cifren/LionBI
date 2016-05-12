import uniqId from "../model/uniqId";
import {
  UPDATE_MODULE,
  INITIALIZE_COLUMN,
  ADD_COLUMN,
  UPDATE_COLUMN_COUNT,
  UPDATE_DISPLAY_ID,
  UPDATE_COLUMN_LIST,
  UPDATE_CATEGORY
} from "../actions/moduleTableActions";

const INITIAL_TABLE = {columnList: [], tableDef: {}};
export function moduleTable(state = INITIAL_TABLE, action) {
    switch (action.type) {
      case INITIALIZE_COLUMN:
        var columnList = [];
        const tableDef = action.tableDef;
        
        // header
        tableDef.headers.map((col, key)=>{
          if(!columnList[key]){
            columnList[key] = {};
          }
          columnList[key].header = col;
        });
        
        // category
        tableDef.categories[0].columns.map((col, key)=>{
          columnList[key].category = col;
        });
        
        // row
        tableDef.categories[1].row.columns.map((col, key)=>{
          columnList[key].row = col;
        });
        
        return Object.assign({}, state, {...state, columnList, tableDef: action.tableDef});
      case ADD_COLUMN:
        const column = {
          "header": {"label": null, "display_id": uniqId(20)}, 
          "category": {"dataId": null, "groupAction": null, "actions": []}, 
          "row": {"dataId": null, "actions": []}
        };
        var newState = state;
        newState.columnList.push(column);
        return Object.assign({}, state, newState);
      case UPDATE_COLUMN_LIST:
        return Object.assign({}, state, {...state, columnList: action.columnList});
      case UPDATE_CATEGORY:
        var newColumnList = state.columnList;
        newColumnList[action.key].category = action.category;
        
        return Object.assign({}, state, {...state, columnList: newColumnList});
      case UPDATE_MODULE:
        return Object.assign({}, state, {
            tableDef: action.module
        });
      case UPDATE_DISPLAY_ID:
        return Object.assign({}, state, {
            tableDef: {...state.tableDef, "display_id": action.displayId}
        });
      default:
        return state;
    }
};