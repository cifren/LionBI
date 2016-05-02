import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export default class GroupCellEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editMode: false,
      dataId: null,
      groupActions: [],
      actions: []
    };
  }
  
  getDataId(){
    return [
      {"label": "Col1", "value": "col1"},
      {"label": "Col1", "value": "col1"},
      {"label": "Col1", "value": "col1"},
    ];
  }
  
  getGroupActions(){
    return [
      {"label": "Sum", "value": "sum"},
      {"label": "Sum", "value": "sum"},
      {"label": "Sum", "value": "sum"},
    ];
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
  
  onChangeDataId(){
    
  }
  
  onChangeAction(){
    
  }
  
  onChangeGA(){
    
  }
  
  addGA(){
    
  }
  
  addAction(){
    
  }
  
  render(){
    return (
      <div class="row">
        <div class="col-lg-12">
          <h2>Group edit</h2>
          <div class="row">
            <div class="col-lg-12">
              <div>
                Data id: <Select 
                  options={this.getDataIds()}
                  onChange={this.onChangeDataId.bind(this)}
                  />
              </div>
              <div>
                Group Actions: <i class="fa fa-plus fa-2x" onClick={this.addGA.bind(this)}> add new GA</i>
                {
                  this.state.groupActions.map((item, key) => {
                    // need options depending on GrpAction
                    const GrpActOptions = null;
                    return (
                      <div>
                        <Select 
                          options={this.getGroupActions()} 
                          value={this.state.groupActions[key]}
                          onChange={this.onChangeGA.bind(this)}
                          />
                        {GrpActOptions}
                      </div>
                    );
                  })
                }
              </div>
              <div>
                Actions: <i class="fa fa-plus fa-2x" onClick={this.addAction.bind(this)}> add new Action</i>
                {
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
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch){
  return {
    //actions: bindActionCreators(Object.assign({}, reportConfigEditActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupCellEdit);