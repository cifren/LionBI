import React from "react";
import {ROW_CELL_EDIT} from "./Main";

export default class RowTr extends React.Component{
  componentWillReceiveProps(nextProps){
    this.nextProps = nextProps;
  }
  
  openItemCellEdit(key){
    this.props.changeRender(ROW_CELL_EDIT, key);
  }
  
  render(){
    const columnList = this.props.columnList;
    
    return (
      <div class="row">
        <div class="col-lg-2">
          <div class="row">
            <div class="col-sm-6"><strong>Row </strong></div>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="row">
            {
              columnList.map((item, key) => {
                const row = item.row;
                return (
                  <ItemCell 
                    item={row} 
                    key={key} 
                    itemKey={key} 
                    openItemCellEdit={this.openItemCellEdit.bind(this)}
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

export class ItemCell extends React.Component{
  
  openItemCellEdit(){
    this.props.openItemCellEdit(this.props.itemKey);
  }
  
  render(){
    const item = this.props.item;
    
    return (
      <div class="col-xs-4">
        <div class="col-lg-12 well well-sm">
          <div class="row">
            <div class="col-sm-12">
              <a onClick={this.openItemCellEdit.bind(this)}>
                <i class="fa fa-edit fa-border"> Edit </i>
              </a>
            </div>
            <div class="col-sm-12">
              <strong>Data Id:</strong> {item.data_id}
            </div>
            
            <div class="col-sm-12">
              <br/><strong>Actions:</strong>
              <ul>
                {
                  item.actions.map((item2, key2)=>{
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