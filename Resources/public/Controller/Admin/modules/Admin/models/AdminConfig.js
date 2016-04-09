import FormMapper from './mappers/FormMapper';
import ListMapper from './mappers/ListMapper';
import ShowMapper from './mappers/ShowMapper';
import RouteCollection from './routes/RouteCollection';

export default class AdminConfig {
  static properties;

  init() {
    this.checkName();
    const properties = this.constructor.properties;
    this.formMapper = new FormMapper(properties);
    this.listMapper = new ListMapper(properties);
    this.showMapper = new ShowMapper(properties);
    this.routeCollection = new RouteCollection();

    this.configureFormFields(this.formMapper);
    this.configureListFields(this.listMapper);
    this.configureShowFields(this.showMapper);
    this.configureRoutes(this.routeCollection);

    return this;
  }
  
  set title(title) {
    this._title = title;
  }

  get title() {
    if (this._title) {
      return this._title;
    } else {
      return this.adminName;
    }
  }

  set adminName(adminName) {
    this._adminName = adminName;
  }

  get adminName() {
    return this._adminName;
  }

  set restName(restName) {
    this._restName = restName;
  }
  
  get restName(){
    if(this._restName){
      return this._restName;
    }
      
    return this.adminName;
  }
  
  set formName(formName){
    this._formName = formName;
  }
  
  get formName(){
    return (this._formName)?this._formName:this.restName;
  }
  
  // form page, include create page and edit page
  configureFormFields(formMapper) {}

  // filter on the list page
  configureDatagridFilters(datagridMapper) {}
  
  // list page
  configureListFields(listMapper) {}

  // show page 
  configureShowFields(showMapper) {}

  configureRoutes(routeCollection) {}

  checkName() {
    if (!this._adminName) {
      throw ('The value \'adminName\' is missing');
    }
  }
}