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

const getPromotionById = async (id: string) => {
  try {
    const response = await axios.get(`${prefijo}/user/promotions/${id}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[getPromotionById] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

const createPromotion = async (data: CreatePromotion) => {
  try {
    const response = await axios.post(`${prefijo}/admin/promotions`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[createPromotion] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

const updatePromotion = async (id: string, data: Partial<CreatePromotion>) => {
  try {
    const response = await axios.put(`${prefijo}/admin/promotions/${id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[updatePromotion] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

const deletePromotion = async (id: string) => {
  try {
    await axios.delete(`${prefijo}/admin/promotions/${id}`);
  } catch(error) {
    const axiosError = error as AxiosError;
    console.error(
      "[deletePromotion] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;    
  }
}

export const promotionService = {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
};
