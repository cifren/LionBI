import React from "react";

export default class DashboardPage extends React.Component {
  render() {
    return (
    <div>
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Dashboard</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-bell fa-fw"></i> OxPecker last running task Panel
                    </div>
                    <div class="panel-body">
                        <div class="list-group">
                            <a class="list-group-item" href="#">
                                <i class="fa fa-comment fa-fw"></i> New Comment
                                <span class="pull-right text-muted small"><em>4 minutes ago</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                <span class="pull-right text-muted small"><em>12 minutes ago</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-envelope fa-fw"></i> Message Sent
                                <span class="pull-right text-muted small"><em>27 minutes ago</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-tasks fa-fw"></i> New Task
                                <span class="pull-right text-muted small"><em>43 minutes ago</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-upload fa-fw"></i> Server Rebooted
                                <span class="pull-right text-muted small"><em>11:32 AM</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-bolt fa-fw"></i> Server Crashed!
                                <span class="pull-right text-muted small"><em>11:13 AM</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-warning fa-fw"></i> Server Not Responding
                                <span class="pull-right text-muted small"><em>10:57 AM</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-shopping-cart fa-fw"></i> New Order Placed
                                <span class="pull-right text-muted small"><em>9:49 AM</em>
                                </span>
                            </a>
                            <a class="list-group-item" href="#">
                                <i class="fa fa-money fa-fw"></i> Payment Received
                                <span class="pull-right text-muted small"><em>Yesterday</em>
                                </span>
                            </a>
                        </div>
                        <a class="btn btn-default btn-block" href="#">View All Alerts</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}