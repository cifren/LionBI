import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as reportConfigActions from "../actions/reportConfigActions";
import Component from "../components/Report";
import { routerActions } from "react-router-redux";

function mapStateToProps(state) {
  return {state};
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, reportConfigActions, routerActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);