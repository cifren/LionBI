import {
  CREATE_POOL,
  COLLECTION_LOADED,
  OBJECT_LOADED
} from "../actions/adminAction";
import Pool from "../models/Pool";

const INITIAL_DATA = {pool: {}};
export function pool(state = INITIAL_DATA, action) {
    switch (action.type) {
      case CREATE_POOL:
        return Object.assign({}, state, {pool: new Pool(action.adminConfig, action.restData)});
      case COLLECTION_LOADED:
        return Object.assign({}, state, {pool: Object.assign(state.pool, {restData: action.collection})});
      case OBJECT_LOADED:
        return Object.assign({}, state, {pool: Object.assign(state.pool, {restData: action.collection})});
      default:
        return state;
    }
}