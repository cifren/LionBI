import React from "react";
import Select from "react-select";
import {MAIN_EDIT} from "./Main";
import {groupActions, columnActions} from "./Actions/actions";
import {isEmpty} from "lodash";

export default class CategoryCellEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataIds: [],
      groupActions: [],
      columnActions: [],
    };
  }
  
  componentDidMount(){
    this.initGroupActionList();
    this.initColumnActionList();
  }
  
  update(category){
    this.props.actions.updateCategory(this.props.itemKey, category);
  }
  
  initGroupActionList(){
    if(isEmpty(this.state.groupActions)){
      var groupActionList = [];
      for(var key in groupActions) {
        groupActionList.push({"label": key, "value": key});
      }
      this.setState({groupActions: groupActionList});
    }
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
    var category = {...this.props.item};
    if(newValue){
      category.data_id = newValue.value;
    } else {
      category.data_id = null;
    }
    this.update(category);
  }
  
  onChangeSelectGA(newValue){
    var category = {...this.props.item};
    if(!category.group_action){
      category.group_action = {};
    }
    
    if(newValue){
      category.group_action.name = newValue.value;
    } else {
      category.group_action.name = null;
    }
    this.update(category);
  }
  
  onChangeGroupAction(newValue){
    var category = {...this.props.item};
    if(!category.group_action){
      category.group_action = {};
    }
    
    category.group_action = newValue;
    this.update(category);
  }
  
  onChangeAction(key, item){
    var category = this.props.item;
    
    category.actions[key] = item;
    
    this.update(category);
  }
  
  addAction(){
    var action = {"name": null, "options": {}};
    var category = this.props.item;
    
    category.actions.push(action);
    this.update(category);
  }
  
  changeRender(){
    this.props.changeRender(MAIN_EDIT);
  }
  
  render(){
    const category = this.props.item;
    var gaName = null;
    if(category.group_action){
      gaName = category.group_action.name;
    }
    
    return (
      <div class="row">
        <div class="col-lg-12">
          <h2>Category edit</h2>
        
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
                  value={category.data_id}
                  options={this.props.dataIds}
                  onChange={this.onChangeDataId.bind(this)}
                  />
              </div>
              <div>
                <strong>Group Action: </strong>
                <div>
                  <Select 
                    value={gaName}
                    options={this.state.groupActions}
                    onChange={this.onChangeSelectGA.bind(this)}
                    />
                  {this.groupActionRender(category.group_action)}
                </div>
              </div>
              <div>
                <strong>Actions:</strong> 
                <a class="btn btn-primary">
                  <i class="fa fa-plus" onClick={this.addAction.bind(this)}> add</i>
                </a>
                {
                  category.actions.map((item, key) => {
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
  
  groupActionRender(groupAction){
    if(!groupAction || !groupAction.name){
      return null;
    }
    const ComponentAction = groupActions[groupAction.name];
    return (
      <ComponentAction 
        moduleTable={this.props.moduleTable}
        groupAction={groupAction}
        action={{groupAction}}
        dataIds={this.props.dataIds}
        onChange={this.onChangeGroupAction.bind(this)}
      />
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