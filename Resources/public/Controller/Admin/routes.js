import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import App from "./containers/App";
import NavigationPage from "./containers/NavigationPage";
import DashboardPage from "./containers/DashboardPage";
import ReportAdminPage from "./containers/ReportAdminPage";
import ReportConfigEditPage from "./containers/ReportConfigEditPage";
import DataEditPage from "./containers/DataEditPage";
import DataAdminPage from "./containers/DataAdminPage";
import ModuleBarEditPage from "./containers/ModuleBarEditPage";
import ModuleTableEditPage from "./containers/ModuleTableEditPage";
import ModuleChoiceCreate from "./components/ModuleChoiceCreate";
import CategoryCellEdit from "./components/ModuleTableEdit/CategoryCellEdit";
import RowCellEdit from "./components/ModuleTableEdit/CategoryCellEdit";

const common = {
  navigation: NavigationPage,
};

export default (
  <Route path="/">
    <Redirect from="/" to="/admin" />
    <Route path="/admin" component={App}>
      <IndexRoute components={{...common, content: DashboardPage}} />
      <Route name="data_admin_edit" path="data/edit/:id"
          components={{...common, content: DataEditPage}} />
      <Route name="data_admin" path="data/:adminPageType(/:id)"
          components={{...common, content: DataAdminPage}} />
      {/* "report_admin_edit" needs to be before "report_admin" */}
      <Route path="report">
        <Route path="module">
          <Route name="module_create_choice" path="choice/:reportId"
              components={{...common, content: ModuleChoiceCreate}} />
          <Route name="module_bar_edit" path="bar/:id"
              components={{...common, content: ModuleBarEditPage}} />
          <Route path="table">
            <Route path="row/:rowId"
                components={{...common, content: RowCellEdit}} />
            <Route path="category/cell"
                components={{...common, content: CategoryCellEdit}} />
            <Route name="module_table_edit" path=":id"
                components={{...common, content: ModuleTableEditPage}} />
          </Route>
        </Route>
        <Route name="report_admin_edit" path="edit/:id"
            components={{...common, content: ReportConfigEditPage}} />
        <Route name="report_admin" path=":adminPageType(/:id)"
            components={{...common, content: ReportAdminPage}} />
      </Route>
      <Route path="*"
          components={{...common, content: _ => <h1>Page not found.</h1>}} />
    </Route>
  </Route>
);