import axios, { type AxiosError } from "axios";
import { CreatePromotion, PromotionsResponse } from "../interfaces/promotion";

const apiUrl = import.meta.env.VITE_API_URL;
const prefijo = `${apiUrl}/api`;

const getAllPromotions = async (): Promise<PromotionsResponse[]> => {
  try {
    const response = await axios.get<PromotionsResponse[]>(
      `${prefijo}/user/promotions`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[getAllPromotions] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

const createPromotion = async (data: CreatePromotion) => {
  try {
    const response = await axios.post(`${prefijo}/admin/promotions`, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[createPromotion] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

export const promotionService = {
  getAllPromotions,
  createPromotion
};
