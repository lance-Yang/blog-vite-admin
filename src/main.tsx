import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import "./index.css";
import "./assets/fontAwesome/css/font-awesome.min.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.Fragment>
);
