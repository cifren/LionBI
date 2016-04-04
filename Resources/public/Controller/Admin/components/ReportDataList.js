import React, {PropTypes} from "react";
import {Link} from "react-router";
import Loading from "../modules/Admin/components/Loading";

export default class ReportDataList extends React.Component {
  static propTypes = {
    restReportDatas: PropTypes.object.isRequired
  };
  
  handleDelete(id) {
    this.props.actions.deleteReportData(id);
  }
  
  componentDidMount() {
    this.props.actions.fetchReportDatas();
  }
  
  render() {
    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
              <h1 class="page-header">Data List  <Loading active={this.props.restReportDatas.loading}></Loading></h1>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-12">
            <Link to={"/admin/data/create"} class="btn btn-success"><i class="fa fa-plus-square"></i> Create</Link>
          </div>
        </div>
        
        <div class="row ">
          <div class="col-lg-6">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.restReportDatas.data.map(function (item) {
                    return (
                        <tr key={item.id}>
                          <td><i class="fa fa-th-large"></i></td>
                          <td>{item.id}</td>
                          <td>{item.displayName}</td>
                          <td>
                            <Link class="btn btn-primary" to={"/admin/data/edit/" + item.id}>Edit</Link>
                            <a class="btn btn-danger" onClick={this.handleDelete.bind(this, item.id)}>Delete</a>
                          </td>
                        </tr>
                    )
                  }.bind(this))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}