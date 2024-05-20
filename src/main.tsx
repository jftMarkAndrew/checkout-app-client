import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ItemProvider } from "./context/ItemContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CountryProvider } from "./context/CountryContext";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ItemProvider>
        <CurrencyProvider>
          <CountryProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CountryProvider>
        </CurrencyProvider>
      </ItemProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
