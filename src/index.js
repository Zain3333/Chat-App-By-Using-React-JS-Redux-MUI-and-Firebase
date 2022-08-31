import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./Store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
