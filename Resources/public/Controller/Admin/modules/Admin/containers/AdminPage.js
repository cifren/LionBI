import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Router from "../components/Router";
import * as AdminActions from "../actions/adminAction";
import { routerActions } from "react-router-redux";

export default class AdminPage extends React.Component {
  
  defaultMapStateToProps(state, adminConfigReducer){
    return (state) => {
      console.log('map',state)
        return {
          adminConfig: state[adminConfigReducer].adminConfig.init(),
          pool: state.poolReducer.pool,
          adminObject: state.restGet,
          collection: state.restCollection,
          restPost: state.restPost,
          restPut: state.restPut,
          restDelete: state.restDelete
        }
      };
  }
    
  defaultMapDispatchToProps(){
    return ((dispatch) => {
      return {
        actions: bindActionCreators(Object.assign({}, AdminActions, routerActions), dispatch)
      }
    });
  }
  
  get mapDispatchToProps(){
    return this._mapDispatchToProps?this._mapDispatchToProps:this.defaultMapDispatchToProps();
  }
  
  set mapDispatchToProps(mapDispatchToProps){
    this._mapDispatchToProps = mapDispatchToProps;
  }
  
  connect(){
    return connect(this.mapStateToProps, this.mapDispatchToProps)(Router);
  }
}