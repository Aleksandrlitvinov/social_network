import './index.css';
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/redux-store.ts";
import { Provider } from "react-redux";

//const rerenderEntireTree = (state) => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={ store }>
      <App/>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
//}

//rerenderEntireTree(store.getState())

// store.subscribe(() => {
//   let state = store.getState()
//   rerenderEntireTree(state)
// })
