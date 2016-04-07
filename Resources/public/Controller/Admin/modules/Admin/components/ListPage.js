import React from "react";
import List from "./List";
import {isEqual} from 'lodash';

export default class ListPage extends React.Component {
  componentDidMount() {
    const adminConfig = this.props.adminConfig;
    this.props.actions.getPool(adminConfig, this.props.collection);
    this.props.actions.fetchCollection(adminConfig.restUrl, adminConfig.restName);
  }
  
  componentWillReceiveProps(nextProps){
    if(!isEqual(this.props.collection, nextProps.collection)){
      this.props.actions.setCollection(nextProps.collection);
    }
  }
  
  componentWillUnmount (){
    this.props.actions.poolReset();
  }
  
  render() {
    const pool = this.props.pool;
    
    return (
      <div>
        <List pool={pool}></List>
      </div>
    );
  }

}