import React from "react";
import {CATEGORY_CELL_EDIT} from "./Main";
import Select from "react-select";

export default class CategoryTr extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataIds: []
    };
  }
  
  componentWillReceiveProps(nextProps){
    
  }
  
  openCategoryCellEdit(key){
    this.props.changeRender(CATEGORY_CELL_EDIT, key);
  }
  
  onChangeGroupBy(newValue){
    var tableDef = Object.assign({}, this.props.tableDef);
    
    var groupBy = null;
    if(newValue){
      groupBy = newValue.value;
    }
    // 0 means the "group" category
    tableDef.categories[0].group_by = groupBy;
    
    this.props.actions.updateTableDef(tableDef);
  }
  
  render(){
    const columnList = this.props.columnList;
    
    return (
      <div class="row">
        <div class="col-lg-2">
          <div class="row">
            <div class="col-sm-6">
              <strong>Group </strong>
            </div>
            <div class="col-sm-6">
              <Select
                value={this.props.groupBy}
                options={this.props.dataIds}
                onChange={this.onChangeGroupBy.bind(this)}
              />
            </div>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="row">
            {
              columnList.map((item, key) => {
                const category = item.category;
                return (
                  <CategoryCell 
                    category={category} 
                    key={key} 
                    categoryKey={key} 
                    openCategoryCellEdit={this.openCategoryCellEdit.bind(this)}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export class CategoryCell extends React.Component{
  
  openCategoryCellEdit(){
    this.props.openCategoryCellEdit(this.props.categoryKey);
  }
  
  render(){
    const category = this.props.category;
    
    return (
      <div class="col-xs-4">
        <div class="col-lg-12 well well-sm">
          <div class="row">
            <div class="col-sm-12">
              <a onClick={this.openCategoryCellEdit.bind(this)}>
                <i class="fa fa-edit fa-border"> Edit </i>
              </a>
            </div>
            <div class="col-sm-12">
              <strong>Data Id:</strong> {category.data_id}
              {
                (()=>{
                  if(category.group_action){
                    return (<div><br/><strong>GA:</strong> {category.group_action.name}</div>);
                  }
                })()
              }
            </div>
            
            <div class="col-sm-12">
              <br/><strong>Actions:</strong>
              <ul>
                {
                  category.actions.map((item2, key2)=>{
                    return (<li key={key2}>{item2.name}</li>);
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}