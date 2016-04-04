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
        throw ('Type "${type}" not found');
    }
    
    return this._adminConfig[mapperType].list;
  }
  
  get restData(){
    return this._restData;
  }
  
  set restData(restData){
    this._restData = restData;
  }
  
  get prefixUrl() {
    return (this._adminConfig.urlPrefix)?this._adminConfig.urlPrefix:this._adminConfig.adminName;
  }
}