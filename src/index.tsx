import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/m1-ui/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./main/m2-bll/store";
import {HashRouter, Route} from "react-router-dom";
import LoginPage from "./main/m1-ui/pages/LoginPage";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <HashRouter basename={"/"}>
          <App />
          </HashRouter>
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
