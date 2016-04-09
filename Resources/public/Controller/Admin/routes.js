import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import App from "./containers/App";
import NavigationPage from "./containers/NavigationPage";
import DashboardPage from "./containers/DashboardPage";
import ReportDataListPage from "./containers/ReportDataListPage";
import ReportDataEditPage from "./containers/ReportDataEditPage";
import ReportConfigAdminPage from "./containers/ReportConfigAdminPage";

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
      <Route name="report_admin" path="report/:adminPageType(/:id)"
          components={{...common, content: ReportConfigAdminPage}} />
      <Route path="*"
          components={{...common, content: _ => <h1>Page not found.</h1>}} />
    </Route>
  </Route>
);