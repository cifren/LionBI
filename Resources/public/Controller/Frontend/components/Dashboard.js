import React from "react";
import { Link } from "react-router";

export default class Dashboard extends React.Component {
  componentDidMount(){
    this.props.actions.getReportList();
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.reportConfig_CGet.data != nextProps.reportConfig_CGet.data){
      this.props.actions.updateReportList(nextProps.reportConfig_CGet.data);
    }
  }
  
  render() {
    const list = this.props.reportConfigList;
    
    return (
    <div>
      <div class="row">
        <div class="col-lg-12">
          <h1 class="page-header">Dashboard</h1>
        </div>
      </div>
        <div class="row">
          {
            list.map((item, key)=>{
              return (
                <div class="col-md-3" key={key}>
                  <div class="col-md-12 rectangle-box">
                    <h3>
                      <Link to={"/frontend/report/"+item.id}>{item.display_name}</Link>
                    </h3>
                    <p>Description coming soon...</p>
                  </div>
                </div>
              );
            })
          }
        </div>
    </div>
    );
  }
}