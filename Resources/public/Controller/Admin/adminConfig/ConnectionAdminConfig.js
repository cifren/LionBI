import {AdminConfig} from "sound-admin";
import ApiConnection from "./connection/ApiConnectionAdminConfig";
import DbConnection from "./connection/DbConnectionAdminConfig";
import ExcelConnection from "./connection/ExcelConnectionAdminConfig";

export default class ConnectionAdminConfig extends AdminConfig {
  static properties = {
    "id": {
      "type": "integer",
      "description": "Index",
      "default": null
    },
    "name": {
      "type": "string",
      "description": "Type name",
      "title": "Name",
      "default": null
    },
    "type": {
      "type": "integer",
      "description": "Select type",
      "title": "Type",
      "default": null
    },
    "sub_type": {
      "type": "array",
      "description": "Type details",
      "title": "Type",
      "default": null
    }
  };
  
  constructor(){
    super();
    this.adminName = 'lnbConnection';
    this.title = 'Connection';
    this.restUrl = "http://lionbi-cifren.c9users.io/api/v1";
    this.restName = 'lnbconnection';
    this.urlPrefix = 'admin/connection';
    this.formName = 'lnbConnection';
  }
  
  configureFormFields(formMapper) {
    formMapper
      .add('name', 'text', {"required": true})
      .add('type', 'textarea', {"required": true})
      .add('sub_type', 'subadmin', {
        "required": true,
        "choice": {
          1: ApiConnection,
          2: DbConnection,
          3: ExcelConnection
        },
        "dependence_fieldname": "type"
      })
      ;
  }

  configureDatagridFilters(datagridMapper) {
    datagridMapper.add('name');
  }

  configureListFields(listMapper) {
    listMapper
      .addIdentifier('id')
      .add('name', {'label': "Name"});
  }

  configureShowFields(showMapper) {
    showMapper.add('name');
  }

}