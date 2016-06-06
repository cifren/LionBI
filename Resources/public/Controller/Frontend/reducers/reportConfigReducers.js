import {
  UPDATE_REPORT_LIST
} from "../actions/reportConfigActions";

const INITIAL_REPORT_CONFIG_LIST = {
    list: []
};

export function reportAdminConfig(state = INITIAL_REPORT_CONFIG_LIST, action) {
    switch (action.type) {
      case UPDATE_REPORT_LIST:
        return Object.assign({}, state, {list: action.list});
      default:
        return state;
    }
};