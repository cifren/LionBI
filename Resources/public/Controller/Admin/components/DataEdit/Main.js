import React from "react";
import {EditPage} from "sound-admin";

export default class DataEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "valid",
      columns: [], 
      error: {}
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.adminObject.data != nextProps.adminObject.data){
      if(nextProps.adminObject.data.id){
        this.props.dataEditActions.getColumns(nextProps.adminObject.data.id);
      }
    }
    
    if(this.props.reportData_Get_columns.data != nextProps.reportData_Get_columns.data){
      if(nextProps.reportData_Get_columns.data.status == "valid"){
        this.setState({
          status: nextProps.reportData_Get_columns.data.status,
          columns: nextProps.reportData_Get_columns.data.data
        })
      } else if(nextProps.reportData_Get_columns.data.status == "error") {
        this.setState({
          status: nextProps.reportData_Get_columns.data.status,
          error: nextProps.reportData_Get_columns.data.error
        })
      }
    }
    
    if(nextProps.reportData_Get_columns.data.status && nextProps.restPut.loading === true){
      this.reset = true;
    }
    
    if(nextProps.reportData_Get_columns.data.status && nextProps.restPut.loading == false && this.reset == true){
      this.reset = false;
      this.props.dataEditActions.getColumns(nextProps.adminObject.data.id);
    }
  }
  
  render() {
    var content = null;
    if(this.state.status == "valid") {
      content = (() => {
        return (
          <div class="alert alert-info">
            <strong>Columns available</strong>
            <br/>{"\""}{this.state.columns.join("\", \"")}{"\""}
          </div>
        );
      })();
    } else if(this.state.status == "error") {
      content = (() => {
        return (
          <div class="alert alert-danger">
            <strong>The data could not be computed
            <br/>Reason: </strong>{this.state.error.message}
          </div>
        );
      })();
    }
    
    return (
      <div>
        <EditPage {...this.props}/>
        {content}
      </div>
    );
  }
}
