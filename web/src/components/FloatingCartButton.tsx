import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartModal from "./CartModal";
import { useCart } from "../context/CartContext";

const FloatingCartButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, updateCartItem, removeFromCart, total } = useCart();

  const closeModal = () => setIsOpen(false);  

  const decreaseQuantity = (item: { id: number; quantity: number }) => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleCheckout = () => {
    alert("¡Compra finalizada! Gracias por tu compra.");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition flex items-center justify-center"
      >
        <ShoppingCart className="w-7 h-7" />
      </button>

      {isOpen && (
        <CartModal
          cart={cart}
          updateCartItem={updateCartItem}
          decreaseQuantity={decreaseQuantity}
          total={total}
          handleCheckout={handleCheckout}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default FloatingCartButton;





