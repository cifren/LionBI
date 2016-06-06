import React from "react";
import { Link } from "react-router";

export default class Report extends React.Component {
  componentDidMount(){
    //this.props.actions.getReportList();
  }
  
  componentWillReceiveProps(nextProps){
    /*console.log("props", this.props, nextProps)
    if(this.props.reportConfig_CGet.data != nextProps.reportConfig_CGet.data){
      this.props.actions.updateReportList(nextProps.reportConfig_CGet.data);
    }*/
  }
  
  render() {
    return (
    <div>
      report
    </div>
    );
  }
}