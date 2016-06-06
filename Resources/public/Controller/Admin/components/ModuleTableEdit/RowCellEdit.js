import React from "react";
import Select from "react-select";
import {MAIN_EDIT} from "./Main";
import {columnActions} from "./Actions/actions";
import {isEmpty} from "lodash";

export default class RowCellEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      "dataIds": this.props.dataIds,
      "columnActions": [],
    };
  }
  
  componentDidMount(){
    this.initColumnActionList();
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.dataIds != nextProps.dataIds){
     this.setState({
        "dataIds": this.dataIds
      });
    }
  }
  
  update(item){
    this.props.actions.updateRow(this.props.itemKey, item);
  }
  
  initColumnActionList(){
    if(isEmpty(this.state.columnActions)){
      var columnActionList = [];
      for(var key in columnActions) {
        columnActionList.push({"label": key, "value": key});
      }
      this.setState({columnActions: columnActionList});
    }
  }
  
  onChangeDataId(newValue){
    var item = this.props.item;
    if(newValue){
      item.data_id = newValue.value;
    } else {
      item.data_id = null;
    }
    this.update(item);
  }
  
  onChangeAction(key, action){
    var item = this.props.item;
    
    item.actions[key] = action;
    
    this.update(item);
  }
  
  addAction(){
    var action = {"name": null, "options": {}};
    var item = this.props.item;
    
    item.actions.push(action);
    this.update(item);
  }
  
  changeRender(){
    this.props.changeRender(MAIN_EDIT);
  }
  
  render(){
    const item = this.props.item;
    var gaName = null;
    if(item.group_action){
      gaName = item.group_action.name;
    }
    
    return (
      <div class="row">
        <div class="col-lg-12">
          <h2>Row edit</h2>
        
          <div class="row">
            <div class="col-lg-12">
              <a class="btn btn-default" onClick={this.changeRender.bind(this)}>Back</a>
            </div>
          </div>
          
          <div class="row">
            <div class="col-lg-12">
              <div>
                <strong>Data id:</strong>
                <Select 
                  value={item.data_id}
                  options={this.state.dataIds}
                  onChange={this.onChangeDataId.bind(this)}
                  />
              </div>
              <div>
                <strong>Actions:</strong> 
                <a class="btn btn-primary">
                  <i class="fa fa-plus" onClick={this.addAction.bind(this)}> add</i>
                </a>
                {
                  item.actions.map((item, key) => {
                    return (
                      <ActionCell 
                        selectOptions={this.state.columnActions}
                        key={key}
                        itemKey={key}
                        item={item}
                        onChange={this.onChangeAction.bind(this)}
                      />
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class ActionCell extends React.Component{
  
  onChangeSelect(newValue){
    var item = this.props.item;
    
    if(newValue){
      item.name = newValue.value;
    } else {
      item.name = newValue;
    }
    
    this.props.onChange(this.props.itemKey, item);
  }
  
  onChangeOptions(options){
    var item = this.props.item;
    
    item.options = options;
    
    this.props.onChange(this.props.itemKey, item);
  }
  
  render(){
    const item = this.props.item;
    
    return (
      <div>
        <Select 
          options={this.props.selectOptions}
          value={item.name}
          onChange={this.onChangeSelect.bind(this)}
          />
        {this.actionRender(item)}
      </div>
    );
  }
  
  actionRender(columnAction){
    if(!columnAction.name){
      return null;
    }
    const ComponentAction = columnActions[columnAction.name];
    return (
      <ComponentAction 
        options={columnAction.options}
        columnAction={columnAction}
        onChange={this.onChangeOptions.bind(this)}
      />
    );
  }
  
}