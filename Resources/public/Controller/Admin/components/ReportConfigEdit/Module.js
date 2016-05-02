import React from "react";

export default class Module extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "item": this.props.item
    };
    console.log(this.props)
  }
  
  onClick(){
    this.props.actions.push(`/admin/report/module/choice/${this.props.reportId}`);
  }
  
  render(){
    var block = null;
    if(!this.state.item){
      // add mode
      block = (<i class="fa fa-plus fa-3x text-center"></i>);
    } else {
      // edit mode
      block = (<i class="fa fa-list fa-3x text-center"> {this.state.item.display_id} </i>);
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