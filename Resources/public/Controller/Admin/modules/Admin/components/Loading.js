import React from "react";

export default class Loading extends React.Component {
  getClassCss(){
    return  "fa fa-refresh fa-spin";
  }
  
  render(){
    var cssClass = null;
    
    if(this.props.active){
      cssClass = this.getClassCss();
    }
    
    return (
      <i className={cssClass}></i>
    );
  }
}