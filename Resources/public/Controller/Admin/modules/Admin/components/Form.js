import React from "react";
import Loading from "../components/Loading";
import {Link} from "react-router";
import ReactJsonForm from "react-jsonschema-form";
import {isEmpty} from 'lodash';

export default class Form extends React.Component {
  onSubmit(data) {
    this.props.onSubmit(data);
  }
  
  onDelete() {
    if(this.props.onDelete){
      this.props.onDelete();
    }
  }
  
  render() {
    const pool = this.props.pool;
    
    if(!pool.restData){
      return false;
    }
    console.log(this.props)
    
    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
              <h1 class="page-header">Data Edit <Loading active={pool.loading}></Loading></h1>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-12">
            <ActionList pool={pool} onDelete={this.onDelete.bind(this)}/>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-12">
            <Errors error={pool.restError}/>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-12">
            <ReactJsonForm
              formData={!isEmpty(pool.restData.data)?pool.restData.data:null}
              schema={pool.schema}
              uiSchema={pool.uiSchema}
              onSubmit={this.onSubmit.bind(this)} />
          </div>
        </div>
      </div>
    );
  
  }
}

export class ActionList extends React.Component {
  render(){
    const pool = this.props.pool;
    
    return (
      <div>
        <Link to={`/${pool.urlPrefix}/list`} class="btn btn-default">&laquo; Back</Link>
        {
          (() => {
            if(pool.restData.data.id){
              return <a class="btn btn-danger" onClick={this.props.onDelete}><i class="fa fa-times"> Delete</i></a>;
            }
          })()
        }
      </div>
    );
  }
}

class Errors extends React.Component {
 render() {
   
    if(isEmpty(this.props.error)){
      return false;
    } 
    const formError = this.props.error.errors;
    
    return (
      <div class="alert alert-danger">
        <span>code: {this.props.error.code}</span>
        <ul>
        {
          (() => {
            if(formError){
              return <ErrorDetails formError={formError}/>;
            } else { 
              return <span>{this.props.error.message}</span>;
            }
          })()
        }
        </ul>
      </div>
    );
 }
}
class ErrorDetails extends React.Component {
  render(){
    return (
      <ul>
        {
          this.props.formError.errors.map(function(item, key) {
            return <li key={key}>{item}</li>;
          })
        }
      </ul>
    );
  }
  
}