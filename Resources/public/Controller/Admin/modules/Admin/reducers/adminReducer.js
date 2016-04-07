import {
  CREATE_POOL,
  COLLECTION_LOADED,
  OBJECT_LOADED,
  POOL_RESET,
  OBJECT_UPDATED,
  UPDATE_POOL_ERROR
} from "../actions/adminAction";
import Pool from "../models/Pool";
import rest from "../rests/rest.js";

const INITIAL_DATA = {pool: {}};
export function pool(state = INITIAL_DATA, action) {
    switch (action.type) {
      case CREATE_POOL:
        return Object.assign({}, state, {pool: new Pool(action.adminConfig, action.restData)});
      case POOL_RESET:
        return Object.assign({}, state, {pool: {}});
      case COLLECTION_LOADED:
        return Object.assign({}, state, {pool: Object.assign(state.pool, {restData: action.collection})});
      case OBJECT_LOADED:
        return Object.assign({}, state, {pool: Object.assign(state.pool, {restData: action.object})});
      case OBJECT_UPDATED:
        var pool = state.pool;
        var restData = pool.restData;
        restData = {...restData, data: action.formData};
        pool.restData = restData;
        return Object.assign({}, state, { pool: pool });
      case UPDATE_POOL_ERROR:
        var pool = state.pool;
        pool.restError = action.restPut;
        return Object.assign({}, state, { pool: pool });
      default:
        return state;
    }
}