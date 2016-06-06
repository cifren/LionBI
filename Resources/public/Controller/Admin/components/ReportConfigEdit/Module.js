import React from "react";

export default class Module extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "module": this.props.item
    };
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.module != nextProps.module){
      this.setState({module: nextProps.module});
    }
  }
  
  onClick(){
    if(!this.state.module){
      this.props.actions.push(`/admin/report/module/choice/${this.props.reportId}`);
    } else {
      switch(this.state.module.type){
        case 'table':
          this.props.actions.push(`/admin/report/module/table/${this.state.module.id}`);    
          break;
        case 'bar':
          this.props.actions.push(`/admin/report/module/bar/${this.state.module.id}`);    
          break;
      }
    }
  }
  
  render(){
    var block = null;
    if(!this.state.module){
      // add mode
      block = (<i class="fa fa-plus fa-3x text-center"></i>);
    } else {
      // edit mode
      switch(this.state.module.type){
        case 'table':
          block = (
            <i class="fa fa-list fa-2x text-center"> Table {this.state.module.item.display_id} </i>
          );
          break;
        case 'bar':
          block = (
            <i class="fa fa-list fa-2x text-center"> Bar {this.state.module.item.display_id} </i>
          );
          break;
        default:
          block = null;
      }
    }
    
    return (
      <div>
        <div class="col-lg-3">
          <div class="well well-sm selectableBox" onClick={this.onClick.bind(this)}>
            {block}
          </div>
        </div>
      </div>
    );
    
  }
}