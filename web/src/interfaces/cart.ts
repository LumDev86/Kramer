import { Dispatch, SetStateAction } from "react";

export interface CartProduct {
  id: string;
  name: string;
  price: string;
  image?: string;
  quantity: number;
  cartItemId: string;
}

export interface CartContextType {
  cart: CartProduct[];
  total: number;
  addToCart: (item: CartProduct) => void;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export interface CartItemProps {
  item: CartProduct;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export type AddProductToCart = { productId: string; quantity: number };
export type UpdateProductFromCart = Pick<CartProduct, "cartItemId" | "quantity">;
/*
export interface CartModalProps {
  cart: CartProduct[];
  total: number;
  handleCheckout: () => void;
  closeModal: () => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}
*/

export interface CartOpenProps {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}
