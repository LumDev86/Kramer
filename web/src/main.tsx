import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartProvider.tsx";
import { App } from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);
