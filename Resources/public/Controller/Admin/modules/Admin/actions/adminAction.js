import rest from "../rests/rest.js";

export const CREATE_POOL = "CREATE_POOL";
export const COLLECTION_LOADED = "COLLECTION_LOADED";
export const OBJECT_LOADED = "OBJECT_LOADED";

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

export function fetchCollection(url, collectionName){
  return (dispatch) => {
    dispatch(rest.actions.restCollection({url:url, name: collectionName}));
  };
}

export function setObject(object) {
  return {
    type: OBJECT_LOADED,
    object
  };
}