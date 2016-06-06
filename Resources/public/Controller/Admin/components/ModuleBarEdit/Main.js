import React from "react";
import {Link} from "react-router";
import Dataset from "./Dataset";
import Select from "react-select";

export default class ModuleBarEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "dataIds": []
    };
  }
  
  componentDidMount(){
    this.props.actions.getBar(this.props.params.id);
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.reportBar_Get.data != nextProps.reportBar_Get.data){
      this.props.actions.initializeDef(nextProps.reportBar_Get.data);
      this.props.actions.getDataIds(nextProps.reportBar_Get.data.report_config.id);
    }
    
    if(this.props.reportData_Get_columns.data != nextProps.reportData_Get_columns.data){
      this.setState({
        "dataIds": this.transformDataIds(nextProps.reportData_Get_columns.data.data)
      });
    }
    
    if(this.props.moduleBar.barDef && this.props.moduleBar.barDef != nextProps.moduleBar.barDef){
      this.updateRemote(nextProps.moduleBar.barDef);
    }
  }
  
  transformDataIds(requestDataIds){
    var dataIds = [];
      requestDataIds.map((item)=>{
        var dataId = {"label": item, "value": item};
        dataIds.push(dataId);
      });
    
    return dataIds;
  }
  
  onChangePosition(e){
    this.props.actions.updateValue("position", e.target.value);
  }
  
  onChangeLabelColumn(newValue){
    var val = null;
    if(newValue){
      val = newValue.value;
    }
    this.props.actions.updateValue("label_column", val);
  }
  
  onChangeDatasets(key, value){
    var datasets = this.props.moduleBar.barDef.datasets;
    datasets[key] = value;
    
    this.props.actions.updateValue("datasets", datasets);
  }
  
  updateRemote(module){
    if(this.putTimeout){
      clearTimeout(this.putTimeout);
    }
    this.putTimeout = setTimeout((()=> {
      this.props.actions.updateBar(module);
    }).bind(this), 3000);
  }
  
  onClickAddDataset(){
    this.props.actions.addDataset();
  }
  
  render(){
    const module = this.props.moduleBar.barDef;
    
    return (
      <div class="row">
        <div class="col-lg-12">
          <h1>Bar module</h1>
        
          <div class="row">
            <div class="col-lg-12">
              {this.renderActions()}
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <input 
                class="form-control"
                value={module.position} 
                onChange={this.onChangePosition.bind(this)} 
                placeholder="Type a name"
                />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 well">
              <strong>X axis Label:</strong>
              <Select 
                value={module.label_column}
                options={this.state.dataIds}
                onChange={this.onChangeLabelColumn.bind(this)}
              />
            </div>
          </div>
          {
            (()=>{if(module.datasets){
              return (
                <div class="row">
                  <div class="col-lg-12 well">
                    <strong>Y axis:</strong>
                    <a class="btn btn-primary">
                      <i 
                        class="fa fa-plus" 
                        onClick={this.onClickAddDataset.bind(this)}
                        > Add Dataset</i>
                    </a>
                    {
                      module.datasets.map((item, key)=>{
                        return (
                          <Dataset
                            item={item}
                            datasetKey={key}
                            key={key}
                            dataIds={this.state.dataIds}
                            onChange={this.onChangeDatasets.bind(this)}
                          />
                        );
                      })
                    }
                  </div>
                </div>
              );
            }
            })()
          }
          
        </div>
      </div>
    );
  }
  
  renderActions(){
    const module = this.props.reportBar_Get.data;
    if(!module.report_config){
      return null;
    }
    
    return (
      <div>
        <Link to={`/admin/report/edit/${module.report_config.id}`} class="btn btn-default">&laquo; Back</Link>
        <a class="btn btn-danger" onClick={this.onDelete}><i class="fa fa-times"> Delete</i></a>
      </div>
    );
  }
}