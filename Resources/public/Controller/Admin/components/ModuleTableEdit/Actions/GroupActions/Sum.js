import React from "react";
import Select from "react-select";

export default class Sum extends React.Component{
  constructor(props){
    super(props);
    var columnPath = null;
    if(this.props.groupAction.options){
      columnPath = this.props.groupAction.options.column;
    }
    this.state = {
      "columnDataId": this.getColumnValueFromColumnPath(columnPath),
      "columnList": this.getColumnList()
    };
  }
  
  getColumnList(){
    var columnList = [];
    if(this.props.moduleTable){
      this.props.moduleTable.columnList.map((column) => {
        const item = column.header;
        var cell = {"label": item.label, "value": item.display_id};
        columnList.push(cell);
      });
    }
    
    return columnList;
  }
  
  componentWillReceiveProps(nextProps){
    if(
        (nextProps.groupAction.options && this.props.groupAction.options && 
          this.props.groupAction.options.column != nextProps.groupAction.options.column)
        || (nextProps.groupAction.options && !this.props.groupAction.options && nextProps.groupAction.options.column)
      ){
      var columnPath = null;
      if(nextProps.groupAction.options){
        columnPath = nextProps.groupAction.options.column;
      }
      this.setState({"columnDataId": this.getColumnValueFromColumnPath(columnPath)});
    }
    
    if(this.props.moduleTable != nextProps.moduleTable){
      this.setState({"columnList": this.getColumnList()});
    }
  }
  
  getColumnValueFromColumnPath(columnPath){
    var dataId = null;
    if(columnPath){
      var splitColumnVal = columnPath.split(".");
      dataId = splitColumnVal[1];
    }
    
    return dataId;
  }
  
  onChange(newValue){
    var groupAction = Object.assign({}, this.props.groupAction);
    var val = null;
    
    if(newValue){
      const displayId = this.props.moduleTable.tableDef.display_id;
      // group action column needs to be a generic path for rhinoReport
      val = `\\${displayId}\\body\\0\\1.` + newValue.value;
    }
    groupAction.options = {"column": val};
    this.props.onChange(groupAction);
  }
  
  render(){
    return (
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-12"><strong>Options</strong></div>
          <div class="col-sm-6">
            <strong>select a column</strong>
            <Select
              value={this.state.columnDataId}
              options={this.state.columnList}
              onChange={this.onChange.bind(this)}
              />
          </div>
        </div>
      </div>
    );
  }
}