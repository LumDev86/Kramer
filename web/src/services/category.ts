import axios, { type AxiosError } from "axios";
import { Category } from "../interfaces/category";
import { Product } from "../interfaces/product";

const apiUrl = import.meta.env.VITE_API_URL;
const prefijo = `${apiUrl}/api/user`
const adminPrefijo = `${apiUrl}/api/admin`

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<{ categories: Category[] }>(`${prefijo}/categories`);
    return response.data.categories;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[getAllCategories] Error fetching data:", axiosError.response?.data ?? axiosError.message);
    throw error;
  }
};

const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${prefijo}/categories/${category}/products`);
    return response.data.products;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[getProductsByCategory] Error fetching data:", axiosError.response?.data ?? axiosError.message);
    throw error;
  }
};

// categorias admin

const createCategory = async(FormData:FormData) => {
  try {
    const response = await axios.post(`${adminPrefijo}/categories`, FormData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log("[createCategory] error creating category", axiosError.response?.data ?? axiosError.message);
    throw error;
  }
}

const updateCategory = async (id:string , FormData:FormData) => {
  try {
    const response = await axios.put(`${adminPrefijo}/categories/${id}`, FormData, {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[updateCategory] Error updating category:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
}



const deleteCategory = async(id:string) => {
  try {
    await axios.delete(`${adminPrefijo}/categories/${id}`)
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[deleteCategory] Error deleting category:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
}









export const categoryService = {
  getAllCategories,
  getProductsByCategory,
  createCategory,
  deleteCategory,
  updateCategory
};
