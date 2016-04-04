import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import App from "./containers/App";
import NavigationPage from "./containers/NavigationPage";
import DashboardPage from "./containers/DashboardPage";
import ReportDataListPage from "./containers/ReportDataListPage";
import ReportDataEditPage from "./containers/ReportDataEditPage";
import ReportConfigListPage from "./containers/ReportConfigListPage";
import ReportConfigCreatePage from "./containers/ReportConfigCreatePage";

const common = {
  navigation: NavigationPage,
};

export default (
  <Route path="/">
    <Redirect from="/" to="/admin" />
    <Route path="/admin" component={App}>
      <IndexRoute components={{...common, content: DashboardPage}} />
      <Route name="data_list" path="data/list"
          components={{...common, content: ReportDataListPage}} />
      <Route name="data_edit" path="data/edit/:id"
          components={{...common, content: ReportDataEditPage}} />
      <Route name="data_create" path="data/create"
          components={{...common, content: ReportDataEditPage}} />
      <Route name="report_list" path="report/list"
          components={{...common, content: ReportConfigListPage}} />
      <Route name="report_create" path="report/create"
          components={{...common, content: ReportConfigCreatePage}} />
      <Route path="*"
          components={{...common, content: _ => <h1>Page not found.</h1>}} />
    </Route>
  </Route>
);