import axios, { type AxiosError } from "axios";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";

const apiUrl = import.meta.env.VITE_API_URL;

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<{ categories: Category[] }>(`${apiUrl}/api/user/categories`);
    return response.data.categories;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[getAllCategories] Error fetching data:", axiosError.response ?? axiosError.message);
    throw error;
  }
};

const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${apiUrl}/api/user/categories/${category}/products`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[getProductsByCategory] Error fetching data:", axiosError.response ?? axiosError.message);
    throw error;
  }
};

export const categoryService = {
  getAllCategories,
  getProductsByCategory,
};
