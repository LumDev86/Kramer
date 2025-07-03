import axios, { AxiosError } from "axios";
import { AddProductToCart } from "../interfaces/cart";

const apiUrl = import.meta.env.VITE_API_URL;

const addProductToCart = async (product: AddProductToCart, sessionId: string) => {
  try {
    const response = await axios.post(`${apiUrl}/api/cart/${sessionId}/items`, product);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[addProductToCart] Error fetching data:", axiosError.response?.data ?? axiosError.message);
    throw error;
  }
};

const updateProductFromCart = async (sessionId: string, cartItemId: string, quantity: number) => {
  try {
    const response = await axios.put(`${apiUrl}/api/cart/${sessionId}/items/${cartItemId}`, { quantity });
    return response.data;
  } catch(error) {
    const axiosError = error as AxiosError;
    console.error("[updateProductFromCart] Error fetching data:", axiosError.response?.data ?? axiosError.message);
    throw error; 
  }
}

const removeProductFromCart = async (sessionId: string, cartItemId: string) => {
  try {
    await axios.delete(`${apiUrl}/api/cart/${sessionId}/items/${cartItemId}`);
  } catch(error) {
    const axiosError = error as AxiosError;
    console.error("[updateProductFromCart] Error fetching data:", axiosError.response?.data ?? axiosError.message);
    throw error; 
  }
}

export const cartService = {
  addProductToCart,
  updateProductFromCart,
  removeProductFromCart
};
