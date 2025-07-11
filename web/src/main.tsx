import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from "./contexts/CartProvider";
import { App } from "./App";
import "swiper/css";
import 'swiper/css/free-mode';
import "./index.css";  

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>,
);
