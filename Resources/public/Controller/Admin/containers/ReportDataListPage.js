import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReportDataList from "../components/ReportDataList";
import * as ReportDataActions from "../actions/reportData";

function mapStateToProps(state) {
  return {
    restReportDatas: state.restReportDatas
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ReportDataActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDataList);