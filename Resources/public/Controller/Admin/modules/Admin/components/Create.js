import React from "react";
import Loading from "../components/Loading";
import {Link} from "react-router";
import Form from "react-jsonschema-form";

export default class Create extends React.Component {
  onSubmit(data) {
    //this.props.create(data.formData);
  }
  
  render() {
    const pool = this.props.pool;
    console.log('r', this.props)
    if(!pool.restData){
      return false;
    }
    
    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
              <h1 class="page-header">Data Edit <Loading active={pool.restData.loading}></Loading></h1>
          </div>
        </div>
        <Link to={`/${pool.urlPrefix}/list`}>&laquo; Back</Link>
        <Form
          schema=""
          uiSchema=""
          onSubmit={this.onSubmit.bind(this)} />
        
      </div>
    );
  
  }
}