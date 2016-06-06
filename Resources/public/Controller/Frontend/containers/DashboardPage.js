import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportConfigActions from "../actions/reportConfigActions";
import Component from "../components/Dashboard";
import { routerActions } from "react-router-redux";

function mapStateToProps(state) {
  return {
    "reportConfig_CGet": state.reportConfig_CGet,
    "reportConfigList": state.reportAdminConfig.list
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, reportConfigActions, routerActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);