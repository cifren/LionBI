import React from "react";
import { Route, Redirect, IndexRoute } from "react-router";
import App from "./containers/App";
import NavigationPage from "./containers/NavigationPage";
import DashboardPage from "./containers/DashboardPage";
import ReportPage from "./containers/ReportPage";

const common = {
  navigation: NavigationPage,
};

export default (
  <Route path="/">
    <Redirect from="/" to="/frontend" />
    <Route path="/frontend" component={App}>
      <IndexRoute components={{...common, content: DashboardPage}} />
      <Route name="report" path="report/:id"
          components={{...common, content: ReportPage}} />
      <Route path="*"
          components={{...common, content: _ => <h1>Page not found.</h1>}} />
    </Route>
  </Route>
);