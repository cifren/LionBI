import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReportDataEdit from "../components/ReportDataEdit";
import * as ReportDataActions from "../actions/reportData";
import { routerActions } from "react-router-redux";

function mapStateToProps(state) {
  const reportData = state.restReportDataCrud.data.id || !state.restReportDataCrud.data.id && state.restReportDataCrud.loading?
    state.restReportDataCrud:state.restReportDataPost;
  return {
    reportData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ReportDataActions, routerActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDataEdit);