import React from "react";
import Form from "./Form";
import {isEqual, isEmpty} from 'lodash';
import {formatPattern} from 'react-router';

export default class CreatePage extends React.Component {
  
  componentDidMount() {
    const adminConfig = this.props.adminConfig;
    this.props.actions.getPool(adminConfig, this.props.adminObject);
  }
  
  componentWillReceiveProps(nextProps){
    if(!isEqual(this.props.adminObject, nextProps.adminObject)){
      if(nextProps.adminObject.data.id){
        this.props.actions.push(formatPattern(`/${this.props.pool.urlPrefix}/edit/:id`, { id: nextProps.adminObject.data.id }));
      }
    }
  }
  
  onSubmit(data) {
    this.props.actions.setObjectWithFormData(data.formData);
    this.props.actions.postObject(
      this.props.pool.restUrl,
      this.props.pool.restName,
      this.props.pool.formName, 
      data.formData
      );
  }
  
  componentWillUnmount (){
    this.props.actions.restReset();
    this.props.actions.poolReset();
  }
  
  render() {
    return (
      <div>
        <Form actions={this.props.actions} pool={this.props.pool} onSubmit={this.onSubmit.bind(this)}></Form>
      </div>
    );
  }

}