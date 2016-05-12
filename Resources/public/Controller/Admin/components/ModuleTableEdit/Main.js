import React from "react";
import {Link} from "react-router";
import Header from "./HeaderTr";
import Category from "./CategoryTr";
import Row from "./RowTr";
import CategoryCellEdit from "./CategoryCellEdit";

export const CATEGORY_CELL_EDIT = 1;
export const ROW_CELL_EDIT = 2;
export const MAIN_EDIT = 3;
  
export default class ModuleTableEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {"render": {"mode": MAIN_EDIT}};
  }
  
  componentDidMount(){
    this.props.actions.getTable(this.props.params.id);
  }
  
  componentWillReceiveProps(nextProps){
    console.log('nextProMain', this.props, nextProps)
    if(this.props.reportTable_Get.data != nextProps.reportTable_Get.data){
      this.props.actions.initializeColumn(nextProps.reportTable_Get.data);
    }
  }
  
  addColumn(){
    this.props.actions.addColumn();
  }
  
  onDelete(){
    console.log('delete');
  }
  
  onChangeDisplayId(e){
    this.props.actions.updateDisplayId(e.target.value);
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
        return this.renderCategory(render.key);
      case ROW_CELL_EDIT:
        return this.renderRow();
    }
    return null;
  }
  
  renderRow(){
    return null;
  }
  
  renderCategory(key){
    const columnList = this.props.moduleTable.columnList;
    
    return (
      <CategoryCellEdit 
        categoryKey={key}
        category={columnList[key].category}
        changeRender={this.changeRender.bind(this)}
        reportData_Get_columns={this.props.reportData_Get_columns}
        reportConfigId={this.props.reportTable_Get.data.report_config.id}
        actions={{...this.props.actions}}
      />
    );
  }
  
  renderTable(){
    const module = this.props.moduleTable;
    
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
                value={module.tableDef.display_id} 
                onChange={this.onChangeDisplayId.bind(this)} 
                placeholder="Type a name"
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

