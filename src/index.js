import React from "react";
import ReactDOM from "react-dom/client";
import Wrapper from "./Wrapper";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HashRouter>
      <Wrapper />
    </HashRouter>
  </Provider>
);
