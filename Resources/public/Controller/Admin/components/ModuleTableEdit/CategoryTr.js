import React from "react";
import {CATEGORY_CELL_EDIT} from "./Main";

export default class CategoryTr extends React.Component{
  componentWillReceiveProps(nextProps){
    this.nextProps = nextProps;
  }
  
  openCategoryCellEdit(key){
    this.props.changeRender(CATEGORY_CELL_EDIT, key);
  }
  
  render(){
    const columnList = this.props.columnList;
    
    return (
      <div class="row">
        <div class="col-lg-2">
          <div class="row">
            <div class="col-sm-6"><strong>Group </strong></div>
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
          <a onClick={this.openCategoryCellEdit.bind(this)}>
            <i class="fa fa-edit fa-border pull-right"></i>
          </a>
          Data Id: {category.dataid}
          {
            (()=>{
              if(category.groupAction){
                return (<div><br/>GA: {category.groupAction.name}</div>);
              }
            })()
          }
            
          <br/>
          {
            category.actions.map((item2, key2)=>{
              return (<div key={key2}>Action {key2}: {item2.name}</div>);
            })
          }
        </div>
      </div>
    );
  }
}