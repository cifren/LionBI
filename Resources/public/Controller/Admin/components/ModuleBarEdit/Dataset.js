import React from "react";
import Select from "react-select";

export default class Dataset extends React.Component {
  constructor(props){
    super(props);
    this.state = {"dataIds": this.props.dataIds};
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.dataIds != nextProps.dataIds){
      this.setState({
        "dataIds": nextProps.dataIds
      });
    }
  }
  
  onChange(name, value){
    var dataset = {...this.props.item, [name]: value};
    this.props.onChange(this.props.datasetKey, dataset);
  }
  
  onChangeLabel(e){
    this.onChange('label_column', e.target.value);
  }
  
  onChangeDataColumn(newValue){
    var val = null;
    if(newValue){
      val = newValue.value;
    }
    this.onChange('data_column', val);
  }
  
  render(){
    const dataset = this.props.item;
    const dataIds = this.state.dataIds;
    
    return (
      <div>
        <i class="fa fa-list"> Dataset</i>
        <div class="row">
          <div class="col-lg-12">
            <input 
              class="form-control"
              value={dataset.label_column} 
              placeholder="Type a name"
              onChange={this.onChangeLabel.bind(this)}
              />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <Select 
              value={dataset.data_column}
              options={dataIds}
              onChange={this.onChangeDataColumn.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}