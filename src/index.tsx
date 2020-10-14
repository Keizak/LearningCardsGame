import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/m1-ui/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./main/m2-bll/store";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <HashRouter basename={""}>
          <App />
          </HashRouter>
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
