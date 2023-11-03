import './index.css';
import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./redux/redux-store";
import { Provider } from "react-redux";

//const rerenderEntireTree = (state) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    // <React.StrictMode>
      <BrowserRouter>
        <Provider store={ store }>
          <App
            // state={ state }
            // dispatch={ store.dispatch.bind(store) }
            // store={ store }
          />
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

window.store = store
