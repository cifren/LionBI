import React from "react";
import Loading from "../components/Loading";
import {Link} from "react-router";
import {isArray} from 'lodash';

export default class List extends React.Component {
  render() {
    const pool = this.props.pool;
    
    if(Object.getOwnPropertyNames(pool).length === 0 || pool.restData && Object.getOwnPropertyNames(pool.restData).length === 0){
      return false;
    }
    
    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
              <h1 class="page-header">{pool.title}  <Loading active={pool.restData.loading}></Loading></h1>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-12">
            <Link to={"/" + pool.urlPrefix + "/create"} class="btn btn-success"><i class="fa fa-plus-square"></i> Create</Link>
          </div>
        </div>
        <div class="row ">
          <div class="col-lg-6">
            <Table pool={pool}></Table>
          </div>
        </div>
      </div>
    )
  }
}

class Table extends React.Component {
  
  render(){
    const pool = this.props.pool;
    
    if(Object.keys(pool).length === 0){
      return false;
    }
    
    return (
      <table class="table table-striped">
        <thead>
          <tr>
            <th></th>
            {
              pool.getFields('list').map(function (field, key) {
                return (
                  <th key={key}>{field.getOption('label')}</th>
                );
              }.bind(this))
            }
          </tr>
        </thead>
        <Row pool={pool}></Row>
      </table>
    );
  }
}

class Row extends React.Component {
  
  componentWillUpdate (){
    const pool = this.props.pool;
    
    if(!pool.restData){
      return false;
    } else if(!isArray(pool.restData.data) ){
      return false;
    }
    
    return true;
  }
  
  render(){
    const pool = this.props.pool;
    
    return (
      <tbody>
          {
            !isArray(pool.restData.data)?'':pool.restData.data.map(function (item, key) {
              return (
                <tr key={key}>
                  <td><i class="fa fa-th-large"></i></td>
                  {
                    pool.getFields('list').map(function (column) {
                      return (
                        <Cell key={key + column.fieldName} pool={pool} item={item} column={column}></Cell>
                      );
                    }.bind(this))
                  }
                </tr>
              );
            }.bind(this))
          }
      </tbody>
    );
  }
}

class Cell extends React.Component {
  render(){
    const item = this.props.item;
    const column = this.props.column;
    const identifier = this.props.column.options.identifier;
    const pool = this.props.pool;
    const label = item[column.fieldName];
    
    return (
      <td>
      {(() => {
        if(identifier){
          return <Link to={"/" + pool.urlPrefix + "/edit/" + label}>{label}</Link>;
        }else{
          return <div>{label}</div>;
        }
      })()}
      </td>  
    );
  }
}

