import axios, { type AxiosError } from "axios";
import { Product } from "../interfaces/product";
import { PromotionsResponse } from "../interfaces/promotion";

const apiUrl = import.meta.env.VITE_API_URL;
const prefijo = `${apiUrl}/api/user`;

const getAllPromotions = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<PromotionsResponse>(`${prefijo}/products`);
    return response.data.products;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[getAllPromotions] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

export const promotionService = {
  getAllPromotions,
};
