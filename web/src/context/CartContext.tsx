import { createContext, useContext } from "react";
import { CartContextType } from "../interfaces/interfaces";

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};