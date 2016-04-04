import BaseMapper from './BaseMapper';

export default class ListMapper extends BaseMapper {
  constructor(properties){
    super(properties);
  }
  
  add(name, options){
    super.add(name, null, options);
    return this;
  }
}