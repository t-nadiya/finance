import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import App from "./App";

// import {SocketContext, socket} from "./service"

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#363062",
    },
    background: {
      default: "#363062",
    },
    text: {
      primary: "#E9D5CA",
    },
  },
});

ReactDOM.render(
    // <SocketContext.Provider value={socket}>
      <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
      </Provider>,
    // </SocketContext.Provider>,
  
  document.getElementById("root") || document.createElement("div")
);
