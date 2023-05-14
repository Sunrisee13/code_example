import { render } from "react-dom";
import { Counter } from "./components/Counter";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import React from "react";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
