import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ListPage from "../modules/Admin/components/ListPage";
import * as AdminActions from "../modules/Admin/actions/adminAction";

function mapStateToProps(state) {
  return {
    adminConfig: state.reportAdminConfig.adminConfig.init(),
    pool: state.poolReducer.pool,
    collection: state.restCollection
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, AdminActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);