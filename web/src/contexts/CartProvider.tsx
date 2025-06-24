import { useState } from "react";
import { CartContext } from "./CartContext";
import { CartProduct } from "../interfaces/cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  
  const addToCart = (item: CartProduct) => {
    setCart(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (!existingItem) return [...prev, { ...item, quantity: 1 }];
      return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };
 
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartItem, total }}>
      {children}
    </CartContext.Provider>
  );
};
