import React from "react";
import Select from "react-select";

export default class Round extends React.Component{
  
  onChange(e){
    var options = this.props.options;
    options = {"precision": e.target.value};
    
    this.props.onChange(options);
  }
  
  render(){
    var precision = null;
    if(this.props.columnAction.options){
      precision = this.props.columnAction.options.precision;
      if(!precision){
        precision = 0;
      }
    }
    
    return (
      <div class="row">
        <div class="col-sm-12">
          <div class="col-sm-12"><strong>Options</strong></div>
          <div class="col-sm-6">
            <strong>select a column</strong>
            <input
              class="form-control"
              value={precision}
              type="number"
              onChange={this.onChange.bind(this)}
              placeholder="Type a number"
              />
          </div>
        </div>
      </div>
    );
  }
}