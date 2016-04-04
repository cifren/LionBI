import React from "react";
import Create from "./Create";
import {isEqual} from 'lodash';

export default class CreatePage extends React.Component {
  
  componentDidMount() {
    const adminConfig = this.props.adminConfig;
    this.props.actions.getPool(adminConfig, this.props.adminObject);
  }
  
  componentWillReceiveProps(nextProps){
    console.log('nextCreate', this.props, nextProps)
    if(!isEqual(this.props.adminObject, nextProps.adminObject)){
      this.props.actions.setObject(nextProps.adminObject);
    }
  }
  
  render() {
    return (
      <div>
        <Create pool={this.props.pool}></Create>
      </div>
    );
  }

}