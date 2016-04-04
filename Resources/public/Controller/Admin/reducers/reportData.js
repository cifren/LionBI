import {
  DELETE_REPORT_DATA,
  REPORT_DATA_REDIRECT_TO_EDIT,
} from "../actions/reportData";

const INITIAL_REPORTDATAS = {reportDatas: []};
export function reportDataList(state = INITIAL_REPORTDATAS, action) {
    switch (action.type) {
      case DELETE_REPORT_DATA:
        return Object.assign({}, state, {
            reportDatas: state.reportDatas.filter(function(reportData) {
                return reportData.id !== action.id
            })
        });
      default:
        return state;
    }
};

const INITIAL_REPORTDATA = {reportData : {displayName: null, id: null}};
export function reportDataEdit(state = INITIAL_REPORTDATA, action) {
    switch (action.type) {
      case REPORT_DATA_REDIRECT_TO_EDIT:
        return Object.assign({}, state, { reportData : {
          ...state.reportData,
          reload: false
        }});
        
      default:
        return state;
    }
};

