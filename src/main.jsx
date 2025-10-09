// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider, wagmiConfig } from "./components/WalletConnect/WalletConnect.jsx";
import { PresaleProvider } from "./contexts/PresaleContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <PresaleProvider>
          <WalletProvider>
            <BrowserRouter>
              <App />
              <ToastContainer position="top-right" />
            </BrowserRouter>
          </WalletProvider>
        </PresaleProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
