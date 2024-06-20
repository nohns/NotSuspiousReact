/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReactQueryClientProvider from "@/api/client/query";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </ReactQueryClientProvider>
  </React.StrictMode>,
);
