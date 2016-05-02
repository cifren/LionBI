import {AdminConfig} from "sound-admin"

export default class DataAdminConfig extends AdminConfig {
  static properties = {
    "id": {
      "type": "integer",
      "description": "Index",
      "default": null
    },
    "display_name": {
      "type": "string",
      "description": "What name do you want ?",
      "title": "Name",
      "default": null
    },
    "sql_statement": {
      "type": "string",
      "description": "What name do you want ?",
      "title": "Sql Statement",
      "default": null
    }
  };
  
  constructor(){
    super();
    this.adminName = 'reportData';
    this.title = 'Report data';
    this.restUrl = "http://lionbi-cifren.c9users.io/api/v1";
    this.restName = 'reportdatas';
    this.urlPrefix = 'admin/data';
    this.formName = 'reportData';
  }
  
  configureFormFields(formMapper) {
    formMapper
      .add('display_name', 'text', {"required": true})
      .add('sql_statement', 'textarea', {"required": true});
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

}