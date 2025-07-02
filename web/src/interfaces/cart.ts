import { Dispatch, SetStateAction } from "react";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartContextType {
  cart: CartProduct[];
  total: number;
  addToCart: (item: CartProduct) => void;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export interface CartItemProps {
  item: CartProduct;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

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
