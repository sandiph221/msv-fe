import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "./reducers";
import logger from 'redux-logger'

const middleware = [thunk, logger];
export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
