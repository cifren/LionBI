import {AdminConfig} from "sound-admin";

export default class DbConnectionAdminConfig extends AdminConfig {
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
    }
  };
  
  configureFormFields(formMapper) {
    formMapper
      .add('name', 'text', {"required": true})
    ;
  }

  configureShowFields(showMapper) {
    showMapper.add('display_name');
  }

}