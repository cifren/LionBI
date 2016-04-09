import React from "react";
import Form from "./Form";
import {isEqual} from 'lodash';

export default class EditPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pool: {}
    };
  }
  
  componentDidMount() {
    this.props.actions.poolReset();
    const adminConfig = this.props.adminConfig;
    this.props.actions.getPool(adminConfig, this.props.adminObject);
    this.props.actions.fetchObject(adminConfig.restUrl, adminConfig.restName, this.props.params.id);
  }
  
  componentWillReceiveProps(nextProps){
    if(!isEqual(this.props.pool, nextProps.pool)){
      this.setState({pool: nextProps.pool});
    }
    
    if(!isEqual(this.props.adminObject, nextProps.adminObject)){
      this.props.actions.setObject(nextProps.adminObject);
    }
    if(!isEqual(this.props.restPut, nextProps.restPut)){
      this.props.actions.updatePoolError(nextProps.restPut);
    }
    if(!isEqual(this.props.restDelete, nextProps.restDelete)){
      if(!nextProps.restDelete.data.error && !nextProps.restDelete.loading){
        this.props.actions.push(`/${this.props.pool.urlPrefix}/list`);
      } else {
        var restDelete = nextProps.restDelete;
        restDelete = {...restDelete, data: restDelete.data.error};
        this.props.actions.updatePoolError(restDelete);
      }
    }
  }
  
  onSubmit(data) {
    this.props.actions.setObjectWithFormData(data.formData);
    this.props.actions.restReset('restPut');
    this.props.actions.putObject(
      this.props.pool.restUrl,
      this.props.pool.restName,
      this.props.pool.formName,
      this.props.params.id,
      data.formData
      );
  }
  
  onDelete() {
    this.props.actions.restReset('restDelete');
    this.props.actions.deleteObject(
      this.props.pool.restUrl,
      this.props.pool.restName,
      this.props.params.id
      );
  }
  
  componentWillUnmount (){
    this.props.actions.restReset();
  }
  
  render() {
    return (
      <div>
        <Form 
          actions={this.props.actions} 
          pool={this.state.pool}
          onSubmit={this.onSubmit.bind(this)} 
          onDelete={this.onDelete.bind(this)}
          ></Form>
      </div>
    );
  }

}