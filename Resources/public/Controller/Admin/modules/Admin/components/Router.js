import React from "react";
import CreatePage from "./CreatePage";
import EditPage from "./EditPage";
import ListPage from "./ListPage";

export default class Router extends React.Component {
  
  render(){
    switch (this.props.params.adminPageType) {
      case 'list':
        return (<ListPage {...this.props}/>);
      case 'create':
        return (<CreatePage {...this.props}/>);
      case 'edit':
        return (<EditPage {...this.props}/>);
      default:
        return (<ListPage {...this.props}/>);
    }
  }
}