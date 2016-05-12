import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportConfigEditActions from "../actions/reportConfigEdit";
import ReportConfigEdit from "../components/ReportConfigEdit/Main";
import { routerActions } from "react-router-redux";

function mapStateToProps(state) {
  return {
      reportConfig_Get: state.reportConfig_Get,
      reportData_Get: state.reportData_Get,
      reportConfig_Patch: state.reportConfig_Patch,
      reportFilter_CGet: state.reportFilter_CGet,
      reportConfig_modules_CGet: state.reportConfig_modules_CGet
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, reportConfigEditActions, routerActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportConfigEdit);