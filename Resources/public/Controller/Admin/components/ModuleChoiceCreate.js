import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React from "react";
import { routerActions } from "react-router-redux";
import * as moduleTableActions from "../actions/moduleTableActions";
import * as moduleBarActions from "../actions/moduleBarActions";
import {formatPattern} from "react-router";

export class ModuleChoiceCreate extends React.Component {
  componentDidMount(){
    if(!this.props.reportConfig_Get.data || !this.props.reportConfig_Get.data.id){
      this.props.actions.push(formatPattern(`/admin/report/edit/:reportId`, {reportId: this.props.params.reportId}) );
    }
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.reportTable_Post.data !== nextProps.reportTable_Post.data){
      if(nextProps.reportTable_Post.data.id){
        this.props.actions.push(formatPattern(`/admin/report/module/table/:moduleId`, {moduleId: nextProps.reportTable_Post.data.id}) );
      }
    }
    
    if(this.props.reportBar_Post.data !== nextProps.reportBar_Post.data){
      if(nextProps.reportBar_Post.data.id){
        this.props.actions.push(formatPattern(`/admin/report/module/bar/:moduleId`, {moduleId: nextProps.reportBar_Post.data.id}) );
      }
    }
  }
  
  createTable(){
    this.props.actions.createTable(this.props.reportConfig_Get.data.id);
  }
  
  createBar(){
    this.props.actions.createBar(this.props.reportConfig_Get.data.id);
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
              <div class="col-lg-12 well selectableBox" onClick={this.createBar.bind(this)}>
                <i class="fa fa-plus fa-3x text-center"></i>
                Bar
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
    actions: bindActionCreators(Object.assign({}, routerActions, moduleTableActions, moduleBarActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleChoiceCreate);