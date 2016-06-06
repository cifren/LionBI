import {isEmpty} from "lodash";

export default class TableDefToColumnListTransformer{
  static transform(tableDef){
    var columnList = [];
    
    // header
    tableDef.headers.map((col, key)=>{
      if(!columnList[key]){
        columnList[key] = {};
      }
      columnList[key].header = col;
    });
    
    if(!isEmpty(tableDef.categories)){
      // category
      tableDef.categories[0].columns.map((col, key)=>{
        columnList[key].category = col;
      });
    
      // row
      tableDef.categories[1].row.columns.map((col, key)=>{
        columnList[key].row = col;
      });
    }
    
    return columnList;
  }
  
  static reverseTransform(columnList, previousTableDef){
    var tableDef = previousTableDef;
    
    if(isEmpty(tableDef.categories)){
      tableDef.categories = [{"columns":[]}, {"row":{"columns": []}}];
    }
    
    // headers
    tableDef.headers = [];
    // categories
    tableDef.categories[0].columns = [];
    // rows
    tableDef.categories[1].row.columns = [];
    
    columnList.map((column, key) => {
      tableDef.headers.push(column.header);
      tableDef.categories[0].columns.push(column.category);
      tableDef.categories[1].row.columns.push(column.row);
    });
    
    return tableDef;
  }
}