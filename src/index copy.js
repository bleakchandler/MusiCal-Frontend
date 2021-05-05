import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js"
// import * as serviceWorker from './serviceWorker';
import { DataLayer } from './components/DataLayer.js';
import reducer,{ initialState } from './components/Reducer.js';



ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer} >
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();