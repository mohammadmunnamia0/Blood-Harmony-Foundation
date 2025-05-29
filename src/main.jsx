import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Create root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Create root
const root = ReactDOM.createRoot(rootElement);

// Render app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
