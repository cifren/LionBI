import React from "react";
import {formatPattern} from "react-router";
import {Link} from "react-router";

export default class RowTr extends React.Component{
  
  componentWillReceiveProps(nextProps){
    /*this.nextProps = nextProps;
    if(this.isChanged('columnCount')){
      this.setState({columnCount: nextProps.columnCount});
    }*/
  }
  
  isChanged(value){
    return this.props[value] != this.nextProps[value];
  }
  
  render(){
    const columnList = this.props.columnList;
    
    return (
      
      <div class="row">
        <div class="col-lg-2">
          <div class="row">
            <div class="col-sm-6"><strong>Row</strong> </div>
          </div>
        </div>
        <div class="col-lg-10">
          <div class="row">
            {
              columnList.map((item, key) => {
                const row = item.row;
                return (
                  <div class="col-xs-4" key={key}>
                    <div class="col-lg-12 well well-sm">
                      <Link to={formatPattern(
                          `/admin/module/table/group`, 
                          { groupid: key, reportid: this.props.reportId })}>
                        <i class="fa fa-edit fa-border pull-right"></i>
                      </Link>
                      Data Id: {row.dataid}
                        
                      <br/>
                      {
                        row.actions.map((item2, key2)=>{
                          return (<div key={key2}>Action {key2}: {item2.name}</div>);
                        })
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}