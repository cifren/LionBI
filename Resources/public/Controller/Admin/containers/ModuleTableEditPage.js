import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModuleTableEdit from "../components/ModuleTableEdit/Main";
import * as moduleTableActions from "../actions/moduleTableActions";

function mapStateToProps(state) {
  return {
    moduleTable: state.moduleTable
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, moduleTableActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleTableEdit);