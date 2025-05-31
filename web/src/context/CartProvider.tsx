import React, { useState } from "react";
import { CartContext } from "./CartContext";
import { CartProduct } from "../interfaces/interfaces";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);
  
    const addToCart = (item: CartProduct) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((i) => i.id === item.id);
        if (existingItem) {
          return prevCart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prevCart, { ...item, quantity: 1 }];
      });
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateCartItem = (id: number, quantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    };    

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, decreaseQuantity() {            
        }, total }}>
          {children}
        </CartContext.Provider>
    );
};

