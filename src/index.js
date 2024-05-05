import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/styles";
import muiTheme from "./muiTheme"; // Import your MUI theme
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
