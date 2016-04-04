import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ReportConfigActions from "../actions/reportConfigAction";
import CreatePage from "../modules/Admin/components/CreatePage";
import * as AdminActions from "../modules/Admin/actions/adminAction";

function mapStateToProps(state) {
  console.log(state)
  return {
    adminConfig: state.reportAdminConfig.adminConfig.init(),
    pool: state.poolReducer.pool,
    adminObject: state.restPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, ReportConfigActions, AdminActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);