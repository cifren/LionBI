import React from "react";
import {Link} from "react-router";
import Header from "./HeaderTr";
import Category from "./CategoryTr";
import Row from "./RowTr";
import CategoryCellEdit from "./CategoryCellEdit";
import RowCellEdit from "./RowCellEdit";
import {isEmpty} from "lodash";

export const CATEGORY_CELL_EDIT = 1;
export const ROW_CELL_EDIT = 2;
export const MAIN_EDIT = 3;
  
export default class ModuleTableEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "render": {"mode": MAIN_EDIT},
      "dataIds": []
    };
  }
  
  componentDidMount(){
    this.props.actions.getTable(this.props.params.id);
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.reportTable_Get.data != nextProps.reportTable_Get.data){
      this.props.actions.initializeColumn(nextProps.reportTable_Get.data);
      
      this.props.actions.getDataIds(nextProps.reportTable_Get.data.report_config.id);
    }
    
    if(!isEmpty(this.props.moduleTable.columnList) && this.props.moduleTable != nextProps.moduleTable){
      this.updateTable(nextProps.moduleTable);
    }
    
    if(this.props.reportData_Get_columns.data != nextProps.reportData_Get_columns.data){
      var dataIds = [];
      nextProps.reportData_Get_columns.data.data.map((item)=>{
        var dataId = {"label": item, "value": item};
        dataIds.push(dataId);
      });
      
      this.setState({
        dataIds
      });
    }
  }
  
  updateTable(moduleTable){
    if(this.putTimeout){
      clearTimeout(this.putTimeout);
    }
    this.putTimeout = setTimeout((()=> {
      this.props.actions.updateTable(moduleTable.columnList, moduleTable.tableDef);
    }).bind(this), 3000);
  }
  
  addColumn(){
    this.props.actions.addColumn();
  }
  
  onDelete(){
    
  }
  
  onChangePosition(e){
    this.props.actions.update("position", e.target.value);
  }
  
  changeRender(renderValue, key){
    this.setState({
      "render": {"mode": renderValue, "key": key}
    });
  }
  
  render(){
    const render = this.state.render;
    switch (render.mode){
      case MAIN_EDIT:
        return this.renderTable();
      case CATEGORY_CELL_EDIT:
        return this.renderCategoryAndRow(render.key, CATEGORY_CELL_EDIT);
      case ROW_CELL_EDIT:
        return this.renderCategoryAndRow(render.key, ROW_CELL_EDIT);
    }
    return null;
  }
  
  renderRow(){
    return null;
  }

  renderCategoryAndRow(key, mode){
    const columnList = this.props.moduleTable.columnList;
    
    var ComponentEdit = null;
    var item = null;
    if(mode == ROW_CELL_EDIT){
      ComponentEdit = RowCellEdit;
      item = columnList[key].row;
    } else if(mode == CATEGORY_CELL_EDIT){
      ComponentEdit = CategoryCellEdit;
      item = columnList[key].category;
    } else {
      return null;
    }
    
    return (
      <ComponentEdit 
        itemKey={key}
        moduleTable={this.props.moduleTable}
        item={item}
        changeRender={this.changeRender.bind(this)}
        dataIds={this.state.dataIds}
        actions={{...this.props.actions}}
      />
    );
  }
  
  renderTable(){
    const module = this.props.moduleTable;
    var groupBy = null;
    if(this.props.moduleTable 
      && this.props.moduleTable.tableDef.categories
      && this.props.moduleTable.tableDef.categories.length >= 2
      ){
      groupBy = this.props.moduleTable.tableDef.categories[0].group_by;
    }
    return (
      <div class="row">
        <div class="col-lg-12">
          <h1>Table module</h1>
        
          <div class="row">
            <div class="col-lg-12">
              {this.renderActions()}
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <input 
                class="form-control"
                value={module.tableDef.position} 
                onChange={this.onChangePosition.bind(this)} 
                placeholder="Type a position name"
                />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <Header 
                addColumn={this.addColumn.bind(this)}
                columnList={module.columnList}
                actions={{...this.props.actions}}
              />
              <Category 
                actions={{...this.props.actions}}
                groupBy={groupBy}
                tableDef={module.tableDef}
                dataIds={this.state.dataIds}
                columnList={module.columnList}
                reportId={this.props.params.reportId}
                changeRender={this.changeRender.bind(this)}
              />
              <Row 
                columnList={module.columnList}
                changeRender={this.changeRender.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  renderActions(){
    const module = this.props.reportTable_Get.data;
    if(!module.report_config){
      return null;
    }
    
    return (
      <div>
        <Link to={`/admin/report/edit/${module.report_config.id}`} class="btn btn-default">&laquo; Back</Link>
        <a class="btn btn-danger" onClick={this.onDelete}><i class="fa fa-times"> Delete</i></a>
      </div>
    );
  }
}

