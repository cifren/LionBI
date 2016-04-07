export default class Pool {
  constructor(adminConfig, restData){
    this._adminConfig = adminConfig;
    this._restData = restData;
  }
  
  get title(){
    return this._adminConfig.title;
  }
  
  getFields(type = 'list'){
    var mapperType = '';
    switch (type) {
      case 'list':
        mapperType = 'listMapper';
        break;
        
      default:
        throw (`Type "${type}" not found`);
    }
    
    return this._adminConfig[mapperType].list;
  }
  
  get restData(){
    return this._restData;
  }
  
  get loading(){
    return this._loading;
  }
  
  set restData(restData){
    this._loading = restData.loading;
    //on loading true, data must stay with current state
    var data = restData.loading?this._restData.data:restData.data;
    
    this._restData = {...restData, data: data};
  }
  
  get restError(){
    return this._restError;
  }
  
  set restError(restResponse){
    this._loading = restResponse.loading;
    this._restError = restResponse.data;
  }
  
  get urlPrefix() {
    return (this._adminConfig.urlPrefix)?this._adminConfig.urlPrefix:this._adminConfig.adminName;
  }
  
  get schema(){
    return {
      type: 'object',
      required: this.getRequiredFields(),
      properties : this.getSelectedProperties(this._adminConfig.formMapper)
    }
  }
  
  get uiSchema(){
    return {};
  }
  
  getRequiredFields(){
    var requiredFields = [];
    this._adminConfig.formMapper.list.map((field) => {
      if(field.getOption('required')){
        requiredFields.push(field.fieldName);
      }
    });
    
    return requiredFields;
  }
  
  getSelectedProperties(mapper){
    var selection = {};
    
    mapper.list.map((field) => { 
      selection[field.fieldName] = this._adminConfig.constructor.properties[field.fieldName];
    });
    
    return selection;
  }
  
  get restName(){
    return this._adminConfig.restName;
  }
  
  get restUrl(){
    return this._adminConfig.restUrl;
  }
  
  get formName(){
    return this._adminConfig.formName;
  }
}