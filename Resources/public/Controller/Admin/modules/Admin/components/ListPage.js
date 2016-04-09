import React from "react";
import List from "./List";
import {isEqual} from 'lodash';

export default class ListPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pool: {}
    };
  }

  componentDidMount() {
    this.props.actions.poolReset();
    const adminConfig = this.props.adminConfig;
    this.props.actions.getPool(adminConfig, this.props.collection);
    this.props.actions.fetchCollection(adminConfig.restUrl, adminConfig.restName);
  }
  
  componentWillReceiveProps(nextProps){
    if(!isEqual(this.props.pool, nextProps.pool)){
      this.setState({pool: nextProps.pool});
    }
    
    if(!isEqual(this.props.collection, nextProps.collection)){
      this.props.actions.setCollection(nextProps.collection);
    }
  }
  
  render() {
    return (
      <div>
        <List pool={this.state.pool}></List>
      </div>
    );
  }

}