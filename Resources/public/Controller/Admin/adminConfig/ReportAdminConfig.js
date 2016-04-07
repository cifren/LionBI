import AdminConfig from "../modules/Admin/models/AdminConfig"

export default class ReportAdminConfig extends AdminConfig {
  static properties = {
    "id": {
      "type": "integer",
      "description": "Index",
      "default": null
    },
    "display_name": {
      "type": "string",
      "description": "What name do you want ?",
      "title": "Display name",
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
    formMapper.add('display_name', 'text', {"required": true});
  }

  configureDatagridFilters(datagridMapper) {
    datagridMapper.add('display_name');
  }

  configureListFields(listMapper) {
    listMapper
      .addIdentifier('id')
      .add('display_name', {'label': "Display Name"});
  }

  configureShowFields(showMapper) {
    showMapper.add('display_name');
  }

}