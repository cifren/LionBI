import {AdminConfig} from "sound-admin";
import {isEmpty} from 'lodash';

export default class ReportAdminConfig extends AdminConfig {
  static properties = {
    "id": {
      "type": "integer",
      "description": "Index",
      "default": null
    },
    "lnb_report_data_id": {
      "type": "integer",
      "description": "Data Report",
      "title": "Data",
      "default": null,
      "autocomplete": {
        "remote_url": "http://lionbi-cifren.c9users.io/api/v1/reportdatas",
        "remote_value": "id",
        "remote_label": "display_name"
      }
    },
    "display_name": {
      "type": "string",
      "description": "What name do you want ?",
      "title": "Name",
      "default": null
    }
  };
  
  constructor(){
    super();
    this.adminName = 'reportConfig';
    this.title = 'Report config';
    this.restUrl = "http://lionbi-cifren.c9users.io/api/v1";
    this.restName = 'reports';
    this.urlPrefix = 'admin/report';
    this.formName = 'reportConfig';
  }
  
  configureFormFields(formMapper) {
    formMapper
      .add('display_name', 'text', {"required": true})
      .add('lnb_report_data_id', 'comboautocomplete')
      ;
  }

  configureDatagridFilters(datagridMapper) {
    datagridMapper.add('display_name');
  }

  configureListFields(listMapper) {
    listMapper
      .addIdentifier('id')
      .add('display_name', {'label': "Name"});
  }

  configureShowFields(showMapper) {
    showMapper.add('display_name');
  }
  
  //when page receive data on get
  receiveRequestTransformer(request, pageType){
    if(pageType == 'edit' && !isEmpty(request)){
      const dataId = request.lnb_report_data.id;
      delete request.lnb_report_data;
      return {...request, 'lnb_report_data_id': dataId}; 
    }
    return request;
  }
  
  //when form will emit request
  formRequestTransformer(request, pageType){
    var dataId = request.lnb_report_data_id;
    delete request.lnb_report_data_id;
    return {...request, 'lnb_report_data': dataId};
  }

}