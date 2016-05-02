import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import { routerActions } from "react-router-redux";

export class ModuleChoiceCreate extends React.Component {
  createTable(){
    this.props.actions.push(`/admin/report/module/table/${this.props.params.reportId}`);
  }
  
  createChart(){
    this.props.actions.push(`/admin/report/module/chart/${this.props.params.reportId}`);
  }
  
  render(){
    return (
      <div class="row">
        <div class="col-lg-12">
          <div><h3>Choose the module:</h3></div>
          <div class="row">
            <div class="col-lg-3">
              <div class="col-lg-12 well selectableBox" onClick={this.createTable.bind(this)}>
                <i class="fa fa-plus fa-3x text-center"></i>
                Table
              </div>
            </div>
            <div class="col-lg-3">
              <div class="col-lg-12 well selectableBox" onClick={this.createChart.bind(this)}>
                <i class="fa fa-plus fa-3x text-center"></i>
                Chart
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(Object.assign({}, routerActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleChoiceCreate);