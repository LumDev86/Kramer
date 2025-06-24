/*
import { motion } from "framer-motion";
import { useState } from "react";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import { CartModalProps } from "../interfaces/interfaces";

const CartModal: React.FC<CartModalProps> = ({ cart, updateCartItem, decreaseQuantity, total, closeModal }) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const handleFormSubmit = (formData: { name: string; address: string }) => {
    console.log("Datos enviados:", formData);
    closeModal();
  };

  return (
    <div id="overlay" className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50" onClick={closeModal}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {isCheckout ? (
            <CheckoutForm
            onSubmit={handleFormSubmit}
            goBack={() => setIsCheckout(false)}
            total={total}  // Pasar 'total' aquí
          />
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
            {cart.length > 0 ? (
              <ul className="space-y-3">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} updateCartItem={updateCartItem} decreaseQuantity={decreaseQuantity} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Tu carrito está vacío.</p>
            )}
            {cart.length > 0 && (
              <div className="mt-4">
                <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
                <button onClick={() => setIsCheckout(true)} className="w-full bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700 transition">
                  Finalizar Compra
                </button>
              </div>
            )}
          </>
        )}
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
      </motion.div>
    </div>
  );
};

export default CartModal;*/