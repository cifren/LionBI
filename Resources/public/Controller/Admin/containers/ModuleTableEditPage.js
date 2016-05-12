import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModuleTableEdit from "../components/ModuleTableEdit/Main";
import * as moduleTableActions from "../actions/moduleTableActions";

function mapStateToProps(state) {
  return {
    moduleTable: state.moduleTable,
    reportTable_Get: state.reportTable_Get,
    reportData_Get_columns: state.reportData_Get_columns
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, moduleTableActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleTableEdit);