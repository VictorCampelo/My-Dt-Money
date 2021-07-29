import React from "react";
import ReactDOM from "react-dom";
import { App } from "./pages/Main/App";
import { makeServer } from "./services/mirageConfig";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
