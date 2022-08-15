import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VehiclesContextProvider } from "./store/vehicles-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <VehiclesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VehiclesContextProvider>
);
