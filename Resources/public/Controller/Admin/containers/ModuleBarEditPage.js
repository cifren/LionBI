import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModuleBarEdit from "../components/ModuleBarEdit/Main";
import * as moduleBarActions from "../actions/moduleBarActions";

function mapStateToProps(state) {
  return {
    moduleBar: state.moduleBar,
    reportBar_Get: state.reportBar_Get,
    reportData_Get_columns: state.reportData_Get_columns
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, moduleBarActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleBarEdit);