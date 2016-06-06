import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from "react-router";

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(thunk, middleware)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}