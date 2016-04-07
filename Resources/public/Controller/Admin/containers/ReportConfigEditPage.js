import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EditPage from "../modules/Admin/components/EditPage";
import * as AdminActions from "../modules/Admin/actions/adminAction";
import { routerActions } from "react-router-redux";

function mapStateToProps(state) {
  return {
    adminConfig: state.reportAdminConfig.adminConfig.init(),
    pool: state.poolReducer.pool,
    adminObject: state.restGet,
    restPut: state.restPut,
    restDelete: state.restDelete
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, AdminActions, routerActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);