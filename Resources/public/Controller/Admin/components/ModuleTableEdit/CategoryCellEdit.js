import React from "react";
import Select from "react-select";
import {MAIN_EDIT} from "./Main";
import {groupActions} from "./Actions/actions";
import {isEmpty} from "lodash";

export default class CategoryCellEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataIds: [],
      groupActions: []
    };
  }
  
  componentDidMount(){
    if(!this.props.reportData_Get_columns.data.id){
      this.props.actions.getDataIds(this.props.reportConfigId);
    }
    this.initGroupActionList();
  }
  
  componentWillReceiveProps(nextProps){
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
  
  update(category){
    this.props.actions.updateCategory(this.props.categoryKey, category);
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
  
  getActions(){
    return [
      {"label": "Currency", "value": "currency"},
      {"label": "Currency", "value": "currency"},
      {"label": "Currency", "value": "currency"},
      {"label": "Currency", "value": "currency"},
      {"label": "Currency", "value": "currency"},
    ];
  }
  
  onChangeDataId(newValue){
    var category = this.props.category;
    if(newValue){
      category.data_id = newValue.value;
    } else {
      category.data_id = null;
    }
    this.update(category);
  }
  
  onChangeAction(){
    
  }
  
  onChangeGA(){
    
  }
  
  addGA(){
    
  }
  
  addAction(){
    
  }
  
  changeRender(){
    this.props.changeRender(MAIN_EDIT);
  }
  
  render(){
    const category = this.props.category;
    
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
                  options={this.state.dataIds}
                  onChange={this.onChangeDataId.bind(this)}
                  />
              </div>
              <div>
                <strong>Group Action: </strong>
                <div>
                  <Select 
                    options={this.state.groupActions}
                    onChange={this.onChangeGA.bind(this)}
                    />
                  {this.groupActionRender(this.props)}
                </div>
              </div>
              <div>
                <strong>Actions:</strong> 
                <a class="btn btn-primary">
                  <i class="fa fa-plus" onClick={this.addAction.bind(this)}> add</i>
                </a>
                {/*
                  this.state.actions.map((item, key) => {
                    // need options depending on Action
                    const ActOptions = null;
                    return (
                      <div>
                        <Select 
                          options={this.getActions()} 
                          value={this.state.actions[key]}
                          onChange={this.onChangeAction.bind(this)}
                          />
                        {ActOptions}
                      </div>
                    );
                  })
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  groupActionRender(groupAction){
    return (
      <div></div>
    );
  }
}