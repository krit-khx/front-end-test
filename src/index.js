import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./Reducers/index";

const browserHistory = createBrowserHistory();
const logMiddleWare = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logMiddleWare)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>{" "}
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
