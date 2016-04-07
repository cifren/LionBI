import BaseMapper from './BaseMapper';

export default class ListMapper extends BaseMapper {
  constructor(properties){
    super(properties);
  }
  
  addIdentifier(name, options){
    options = {...options, identifier: true};
    super.add(name, null, options);
    return this;
  }
  
  add(name, options){
    super.add(name, null, options);
    return this;
  }
}