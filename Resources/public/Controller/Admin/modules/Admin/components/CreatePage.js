import React from "react";
import Form from "./Form";
import {isEqual, isEmpty} from 'lodash';
import {formatPattern} from 'react-router';

export default class CreatePage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pool: {}
    };
  }
  
  componentDidMount(){
    const adminConfig = this.props.adminConfig;
    this.props.actions.getPool(adminConfig, this.props.restPost);
  }
  
  componentWillReceiveProps(nextProps){
    if(!isEqual(this.props.pool, nextProps.pool)){
      this.setState({pool: nextProps.pool});
    }
    
    if(!isEqual(this.props.restPost, nextProps.restPost)){
      if(nextProps.restPost.data.id){
        this.props.actions.push(formatPattern(`/${this.props.pool.urlPrefix}/edit/:id`, { id: nextProps.restPost.data.id }));
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
  }
  
  render() {
    console.log('renderC', this.state.pool)
    return (
      <div>
        <Form actions={this.props.actions} pool={this.state.pool} onSubmit={this.onSubmit.bind(this)}></Form>
      </div>
    );
  }

}