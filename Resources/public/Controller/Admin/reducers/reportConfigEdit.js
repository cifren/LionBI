import {
} from "../actions/reportData";

const INITIAL_REPORTDATAS = {};
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