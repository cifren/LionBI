import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CreatePage from "../modules/Admin/components/CreatePage";
import * as AdminActions from "../modules/Admin/actions/adminAction";
import { routerActions } from "react-router-redux";

function mapStateToProps(state) {
  return {
    adminConfig: state.reportAdminConfig.adminConfig.init(),
    pool: state.poolReducer.pool,
    adminObject: state.restPost
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, AdminActions, routerActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);