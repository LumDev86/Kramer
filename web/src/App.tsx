import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileUI from "./pages/MobileUI";
import CategoryPage from "./pages/CategoryPages";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className='relative'>
          <Routes>
            <Route path="/" element={<MobileUI />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;



