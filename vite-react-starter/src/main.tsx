import React from "react";
import ReactDOM from "react-dom/client";
import { ClavexProvider } from "@clavex/react";
import "@clavex/ui/styles.css";
import App from "./App.js";

/*
 * ClavexProvider — zero-config edition.
 *
 * Reads VITE_CLAVEX_URL and VITE_CLAVEX_CLIENT_ID from env vars at build time.
 * Set them in .env.local (see .env.example).
 *
 * redirectUri defaults to window.location.origin + "/callback" when omitted.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClavexProvider>
      <App />
    </ClavexProvider>
  </React.StrictMode>,
);
