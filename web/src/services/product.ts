import axios, { type AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const prefijo = `${apiUrl}/api`;

const createProduct = async (newProduct: FormData) => {
  try {
    const response = await axios.post(`${prefijo}/admin/products`, newProduct, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[createProduct] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

export const productServices = {
  createProduct,
};
