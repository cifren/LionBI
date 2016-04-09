# sound-admin
React module, using redux / rest, create a configurable admin interface

## INTRODUCTION
Simple to use, simple to reuse, this module allows to create fast admin interface
for your rest application.

Inspired by [Sonata-Admin](https://sonata-project.org/bundles/admin/2-3/doc/index.html) and 
is intended to be used with [Redux](https://github.com/gaearon/redux) and 
[Redux-Api](https://github.com/lexich/redux-api).

=======
## Documentation
See [DOCS.md](doc/DOCS.md) for API documentation.

=======
## Install
with npm
```sh
npm install sound-admin --save
```

## Example Structure
    .
    ├── ...
    ├── adminConfig             # Store your config 
    │   ├── ItemConfig.js       # Admin config for 'item' rest object
    │   └── ReportConfig.js     # Admin config for 'report' rest object
    ├── containers              # containers files
    │   ├── ItemAdminPage.js    # define your container component
    │   └── ReportAdminPage.js  # define your container component
    ├── reducers                # reducer files
    │   ├── index.js            # Load and combine reducers
    │   ├── otherReducer        # fake reducer for the example
    │   └── someotherReducer    # fake reducer for the example
    ├── index.js                # initial redux configuration
    └── routes.js               # your routing


## Examples
```js
// ./adminConfig/ReportConfig.js
import {AdminConfig} from "sound-admin"

export default class ReportAdminConfig extends AdminConfig {
  static properties = {
    "id": {
      "type": "integer",
      "description": "Index",
      "default": null
    },
    "display_name": {
      "type": "string",
      // default description for all pages
      "description": "What name do you want ?",
      // default label for all pages
      "title": "Display name",
      "default": null
    }
  };
  
  // form page, include create page and edit page
  configureFormFields(formMapper) {
    formMapper.add('display_name', 'text', {"required": true});
  }

  // list page
  configureListFields(listMapper) {
    listMapper
      .addIdentifier('id')  // addIdentifier identify it as a link to edit page
      .add('display_name', {'label': "Display Name"});
  }
}
```


```js
// ./containers/ReportAdminPage.js
import {AdminPage} from 'sound-admin';

var AdminPageInstance = new AdminPage();

AdminPageInstance.mapStateToProps = (state) => {
    return AdminPageInstance.defaultMapStateToProps(state, 'reportAdminConfig');
};

//redux connect call
export default AdminPageInstance.connect();
```

```js
// ./reducers/adminConfigReducer.js
import ReportAdminConfig from "../adminConfig/ReportAdminConfig"
import ItemAdminConfig from "../adminConfig/ItemAdminConfig"

// report reducer
const INITIAL_REPORT_CONFIG = {
    adminConfig: new ReportAdminConfig()
};
export function reportAdminConfig(state = INITIAL_REPORT_CONFIG, action) {
    switch (action.type) {
      default:
        return state;
    }
};

// item reducer
const INITIAL_ITEM_CONFIG = {
    adminConfig: new ItemAdminConfig()
};
export function itemAdminConfig(state = INITIAL_ITEM_CONFIG, action) {
    switch (action.type) {
      default:
        return state;
    }
};
```

```js
// ./reducers/index.js
import {routerReducer} from "react-router-redux";
import {poolReducer} from 'sound-admin';
import {restAdminConfig} from "sound-admin";
import {reportAdminConfig, itemAdminConfig} from './adminConfigReducer';

const rootReducer = combineReducers(Object.assign({}, {
  routing: routerReducer,       // your routing reducer
  poolReducer                   // define the pool needed by sound-admin
  reportAdminConfig,            // define your report reducer
  itemAdminConfig,              // define your item reducer
}, restAdminConfig.reducers     // define the rest configuration to access the data
));

export default rootReducer;
```

```js
// ./routes.js
// ...
import ReportAdminPage from "./containers/ReportAdminPage";
import ItemAdminPage from "./containers/ItemAdminPage";
// ...

export default (
  <Route path="/" component={App}>
    <Route path="report/:adminPageType(/:id)" component={ReportAdminPage} />
    <Route path="item/:adminPageType(/:id)" component={ItemAdminPage} />
    <Route path="*" component={NoMatch}/>
  </Route>
);
```
