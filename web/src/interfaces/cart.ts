import { Dispatch, SetStateAction } from "react";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartContextType {
  cart: CartProduct[];
  total: number;
  addToCart: (item: CartProduct) => void;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export interface CartItemProps {
  item: CartProduct;
  updateCartItem: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
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
