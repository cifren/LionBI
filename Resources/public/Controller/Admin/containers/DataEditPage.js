import {AdminPage} from 'sound-admin';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataEditActions from "../actions/dataEditActions";
import DataEdit from "../components/DataEdit/Main";

/*
 * merge admin edit page with additional props 
 */
var AdminPageInstance = new AdminPage();

AdminPageInstance.mapStateToProps = (state) => {
    return Object.assign({}, AdminPageInstance.defaultMapStateToProps(state, 'dataAdminConfig'), {
      reportData_Get_columns: state.reportData_Get_columns
    });
};

AdminPageInstance.mapDispatchToProps = (dispatch) => {
  return Object.assign({}, AdminPageInstance.defaultMapDispatchToProps(dispatch), {
    dataEditActions: bindActionCreators(Object.assign({}, dataEditActions), dispatch)
  });
};

export default connect(AdminPageInstance.mapStateToProps, AdminPageInstance.mapDispatchToProps)(DataEdit);