export default class Field {
  
  constructor(fieldName, type = null, options = {}){
    this.fieldName = fieldName;
    this.type = type;
    this.options = options;
  }
  
  set fieldName(fieldName){
    this._fieldName = fieldName;
  }
  
  get fieldName(){
    return this._fieldName;
  }
  
  get options(){
    return this._options;
  }
  
  set options(options = {}){
    if(!options['label']){
      options['label'] = this.fieldName;
    }
    
    Object.entries(options).map((item) => {
      this.setOption(item[0], item[1]);
    })
  }
  
  setOption(key, item){
    this._options = Object.assign({}, this._options, {[key]: item});
  }
  
  getOption(name){
    return this._options[name];
  }
  
  getLabel(){
    return this._options['label'];
  }
  
}