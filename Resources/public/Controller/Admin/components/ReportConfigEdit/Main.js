import React from "react";
import {Link} from "react-router";
import {Loading} from "sound-admin";
import Form from "react-jsonschema-form";
import $ from "jquery-lite";
import { PanelGroup, Panel } from 'react-bootstrap';
import Filters from "./Filters";
import Modules from "./Modules";

export default class ReportConfigEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      reportConfig: this.props.reportConfig_Get.data,
      reportData: this.props.reportData_Get.data,
      id: this.props.params.id,
      filters: [],
      modules: this.props.reportConfig_modules_CGet.data
    };
  }
  
  componentDidMount() {
    this.props.actions.resetReportRest();
    this.props.actions.getReport(this.props.params.id);
  }
  
  componentWillReceiveProps(nextProps){
    // on reportConfig data change
    if(this.props.reportConfig_Get.data != nextProps.reportConfig_Get.data){
      this.setState({
        reportConfig: nextProps.reportConfig_Get.data
      });
      // get filter after reportConfig has been loaded
      if(nextProps.reportConfig_Get.data && nextProps.reportConfig_Get.data.id){
        this.props.actions.getFilters(nextProps.reportConfig_Get.data.id);
        this.props.actions.getModules(nextProps.reportConfig_Get.data.id);
      }
    }
    
    if(nextProps.reportFilter_CGet.data && nextProps.reportFilter_CGet.data){
      this.setState({
        filters: nextProps.reportFilter_CGet.data
      });
    }
    
    if(nextProps.reportConfig_modules_CGet.data && nextProps.reportConfig_modules_CGet.data){
      this.setState({
        modules: nextProps.reportConfig_modules_CGet.data
      });
    }
    
    // on reportData data change
    if(this.props.reportData_Get.data != nextProps.reportData_Get.data){
      this.setState({
        reportData: nextProps.reportData_Get.data
      });
    }
    
    // on reportConfig change, update reportData
    if(this.props.reportConfig_Get.data.lnb_report_data != nextProps.reportConfig_Get.data.lnb_report_data){
      if(nextProps.reportConfig_Get.data.lnb_report_data && nextProps.reportConfig_Get.data.lnb_report_data.id){
        this.props.actions.getReportData(nextProps.reportConfig_Get.data.lnb_report_data.id);
      }
    }
    
    // on loading change update state
    if(this.props.reportConfig_Get.loading != nextProps.reportConfig_Get.loading){
      this.setState({
        loading: nextProps.reportConfig_Get.loading
      });
    }
  }
  
  formSchema(){
    return {
      "type": "object",
      "required": ["display_name"],
      "properties": {
        "display_name": { "type": "string", "minChar": 3 }
      }
    };
  }
  
  onDelete(){
    // delete reportConfig
  }
  
  onNameChange(data){
    this.setState({
      reportConfig: Object.assign({}, this.state.reportConfig, {display_name: data.formData.display_name})
    });
    
    if(data.formData.display_name.trim() && 
      $('#reportConfig form')[0].checkValidity() && 
      data.formData.display_name.length >= this.formSchema().properties.display_name.minChar
    ){
      //clear previous timeout, avoid overloading server
      if(this.putTimeout){
        clearTimeout(this.putTimeout);
      }
      this.putTimeout = setTimeout((()=> {this.props.actions.patchReport(this.state.id, {"display_name": data.formData.display_name})}).bind(this), 3000);
    }
  }
  
  render() {
    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
            <h1 class="page-header">Report Config <Loading active={this.state.loading}></Loading></h1>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-12">
            <div>
              <Link to={`/admin/report/list`} class="btn btn-default">&laquo; Back</Link>
              <a class="btn btn-danger" onClick={this.onDelete}><i class="fa fa-times"> Delete</i></a>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div id="reportConfig" class="col-lg-12">
            <Form 
              formData={this.state.reportConfig}
              schema={this.formSchema()}
              onChange={this.onNameChange.bind(this)}
            > </Form>
          </div>
          <div class="col-lg-12">
            <span>
              <strong>Data model:</strong> 
              {" "}<Link to={`/admin/data/edit/${this.state.reportData.id}`}>{this.state.reportData.display_name}</Link>
            </span>
          </div>
          <div class="col-lg-12">
            <PanelGroup defaultActiveKey="2" accordion>
              <Panel header="Filters" eventKey="1">
                <Filters 
                  filters={this.state.filters} 
                  actions={{
                    deleteFilter: this.props.actions.deleteFilter,
                    updateFilter: this.props.actions.updateFilter,
                    createFilter: this.props.actions.createFilter
                  }}
                />
              </Panel>
              <Panel header="Modules" eventKey="2">
                <Modules  
                  actions={{push: this.props.actions.push}}
                  modules={this.state.modules}
                  reportId={this.props.params.id}
                />
              </Panel>
            </PanelGroup>
            
          </div> 
        </div>
      </div>
    )
  }
}
