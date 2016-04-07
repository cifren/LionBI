import rest from "../rests/rest.js";

export const CREATE_POOL = "CREATE_POOL";
export const COLLECTION_LOADED = "COLLECTION_LOADED";
export const OBJECT_LOADED = "OBJECT_LOADED";
export const POOL_RESET = "POOL_RESET";
export const OBJECT_UPDATED = "OBJECT_UPDATED";
export const UPDATE_POOL_ERROR = "UPDATE_POOL_ERROR";

export function getPool(adminConfig, restData) {
  return {
    type: CREATE_POOL,
    adminConfig,
    restData
  };
}

export function setCollection(collection) {
  return {
    type: COLLECTION_LOADED,
    collection
  };
}

export function fetchCollection(url, restName){
  return (dispatch) => {
    dispatch(rest.actions.restCollection({url, name: restName}));
  };
}

export function fetchObject(url, restName, id){
  return (dispatch) => {
    dispatch(rest.actions.restGet({url, name: restName, id}));
  };
}

export function restReset(restName){
  return (dispatch) => {
    if(!restName){
      dispatch(rest.actions.restPost.reset());
      dispatch(rest.actions.restPut.reset());
      dispatch(rest.actions.restGet.reset());
    } else {
      dispatch(rest.actions[restName].reset());
    }
  };
}

export function setObject(object) {
  return {
    type: OBJECT_LOADED,
    object
  };
}

export function setObjectWithFormData(formData){
  return {
    type: OBJECT_UPDATED,
    formData
  };
}

export function poolReset() {
  return {
    type: POOL_RESET
  };
}

export function postObject(restUrl, restName, formName, object) {
  return (dispatch) => {
    dispatch(rest.actions.restPost(
      {url: restUrl, name: restName},
      { body: JSON.stringify({[formName]: object })}
    ));
  };
}

export function putObject(restUrl, restName, formName, id, object) {
  return (dispatch) => {
    dispatch(rest.actions.restPut(
      {url: restUrl, name: restName, id},
      { body: JSON.stringify({[formName]: object })}
    ));
  };
}

export function deleteObject(restUrl, restName, id) {
  return (dispatch) => {
    dispatch(rest.actions.restDelete(
      {url: restUrl, name: restName, id}
    ));
  };
}

export function updatePoolError(restPut){
  return {
    type: UPDATE_POOL_ERROR,
    restPut
  }
}