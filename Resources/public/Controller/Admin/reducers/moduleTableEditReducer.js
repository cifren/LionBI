import uniqId from "../model/uniqId";
import Transformer from "../components/ModuleTableEdit/Transformer/TableDefToColumnListTransformer";
import {
  UPDATE_TABLEDEF,
  INITIALIZE_COLUMN,
  ADD_COLUMN,
  UPDATE_VALUE,
  UPDATE_COLUMN_LIST,
  UPDATE_CATEGORY,
  UPDATE_ROW
} from "../actions/moduleTableActions";

const INITIAL_TABLE = {columnList: [], tableDef: {}};
export function moduleTable(state = INITIAL_TABLE, action) {
    switch (action.type) {
      case INITIALIZE_COLUMN:
        var columnList = Transformer.transform(action.tableDef);
        
        return Object.assign({}, state, {...state, columnList, tableDef: action.tableDef});
      case ADD_COLUMN:
        const display_id = uniqId(20);
        const column = {
          "header": {"label": null, "display_id": display_id}, 
          "category": {"display_id": display_id, "data_id": null, "group_action": {}, "actions": []}, 
          "row": {"display_id": display_id, "data_id": null, "actions": []}
        };
        var newState = state;
        newState.columnList.push(column);
        return Object.assign({}, state, newState);
      case UPDATE_COLUMN_LIST:
        return Object.assign({}, state, {...state, columnList: action.columnList});
      case UPDATE_CATEGORY:
        var newColumnList = state.columnList;
        const category = newColumnList[action.key].category;
        newColumnList[action.key].category = Object.assign({}, category, action.category);
        
        return {...state, columnList: newColumnList};
      case UPDATE_ROW:
        var newColumnList = state.columnList;
        const row = newColumnList[action.key].row;
        newColumnList[action.key].row = Object.assign({}, row, action.row);
        
        return {...state, columnList: newColumnList};
      case UPDATE_TABLEDEF:
        return Object.assign({}, state, {
            tableDef: action.tableDef
        });
      case UPDATE_VALUE:
        return Object.assign({}, state, {
            tableDef: {...state.tableDef, [action.name]: action.value}
        });
      default:
        return state;
    }
};