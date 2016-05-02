import {
  ADD_COLUMN,
  UPDATE_COLUMN_COUNT
} from "../actions/moduleTableActions";

const INITIAL_TABLE = {columnCount: 0, header: []};
export function moduleTable(state = INITIAL_TABLE, action) {
    switch (action.type) {
      case ADD_COLUMN:
        return Object.assign({}, state, {
            columnCount: state.columnCount + 1
        });
      case UPDATE_COLUMN_COUNT:
        return Object.assign({}, state, {
            columnCount: action.columnCount
        });
      default:
        return state;
    }
};