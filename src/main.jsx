import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeContextWrapper from "./context/themeContext.jsx";
import DataContextWrapper from "./context/dataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContextWrapper>
      <DataContextWrapper>
        <App />
      </DataContextWrapper>
    </ThemeContextWrapper>
  </BrowserRouter>
);
