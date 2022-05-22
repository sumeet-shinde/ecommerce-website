import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { store } from "./Redux/store";

// if (process.env.NODE_ENV === "production") {
//   disableReactDevTools();
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </BrowserRouter>
);
