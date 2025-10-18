import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DepartmentProvider } from "./context/DepartmentContext";
import { AdminProvider } from "./context/AdminContext";
import { DepartmentFinanceProvider } from "./context/DepartmentFinanceContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <DepartmentProvider>
          <DepartmentFinanceProvider>
            <App />
          </DepartmentFinanceProvider>
        </DepartmentProvider>
      </AdminProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
