import { Dispatch, SetStateAction } from "react";

// Definimos una base reutilizable para los productos en el carrito
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Extendemos CartItem para incluir imagen si es necesario
export interface CartProduct extends CartItem {
  image: string;
}

// Propiedades de un producto general
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: string;
  weight: string;
  image: string;
}

export interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    brand: string;
    weight: string;
    image: string;
  };
}

// Interfaz base para acciones del carrito
interface CartActions {
  updateCartItem: (id: number, quantity: number) => void;
  decreaseQuantity: (item: Pick<CartItem, "id" | "quantity">) => void;
}

// Componente individual del carrito
export interface CartItemProps extends CartActions {
  item: CartItem;
}

// Modal del carrito
export interface CartModalProps extends CartActions {
  cart: CartItem[];
  total: number;
  handleCheckout: () => void;
  closeModal: () => void;
}

// Formulario de checkout
export interface CheckoutFormProps {
  total: number; // Agregar la propiedad total
  onSubmit: (formData: { name: string; paymentMethod: string; address: string; phone: string }) => void;
  goBack: () => void;
}

// Contexto del carrito
export interface CartContextType extends CartActions {
  cart: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (id: number) => void;
  total: number;
}

// Tarjeta de categoría
export interface CategoryCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

// Propiedades relacionadas con la apertura del carrito
export interface CartOpenProps {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}


