import { createContext } from "react";
import { CartContextType } from "../interfaces/cart";

export const CartContext = createContext<CartContextType | undefined>(undefined);
