import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ModuleChartEdit from "../components/ModuleChartEdit";

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch){
  return {
    //actions: bindActionCreators(Object.assign({}, reportConfigEditActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleChartEdit);