import Field from "../Field";

export default class BaseMapper {
  constructor(properties){
    this.list = [];
    this.properties = properties;
  }
  
  add(name, type, options = {}){
    if(!this.properties[name]){
      throw('Property \'' + name + "' does'nt exist");
    }
    
    const field = new Field(name, type, options);
    this.list.push(field);
    
    return this;
  }
  
}