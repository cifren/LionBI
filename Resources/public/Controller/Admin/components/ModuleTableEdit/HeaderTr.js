import React from "react";


export default class HeaderTr extends React.Component {
  onChange(value, key){
    var columnList = this.props.columnList;
    columnList[key].header = value;
    
    this.props.actions.updateColumnList(columnList);
  }
  
  onClick(){
    this.props.actions.addColumn();
  }
  
  render(){
    const columnList = this.props.columnList;
    return (
      <div class="row">
        <div class="col-lg-2">
          <div class="row">
            <div class="col-sm-6"><strong>Header</strong> </div>
            <div class="col-sm-6">
              <a class="btn btn-primary" onClick={this.onClick.bind(this)}>
                <i class="fa fa-plus"> add column</i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="row">
            {
              columnList.map((item, key) => {
                return (
                  <HeaderCell 
                    item={item.header} 
                    key={key} 
                    headerKey={key} 
                    onChange={this.onChange.bind(this)}
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

export class HeaderCell extends React.Component {
  onChange(e){
    var item = {...this.props.item, "label": e.target.value};
    this.props.onChange(item, this.props.headerKey);
  }
  
  render(){
    return (
      <div class="col-xs-4">
        <div class="col-lg-12 well well-sm">
          <input 
            class="form-control"
            value={this.props.item.label}
            onChange={this.onChange.bind(this)}
            placeholder="Type column name"
          />
        </div>
      </div>
    );
  }
}