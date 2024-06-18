/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes";
import ReactQueryClientProvider from "@/api/client/query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <Routes />
    </ReactQueryClientProvider>
  </React.StrictMode>
);
