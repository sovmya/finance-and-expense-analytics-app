import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FinanceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FinanceProvider>
  </React.StrictMode>
);