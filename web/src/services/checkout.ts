import axios, { type AxiosError } from "axios";
import { CheckoutSubmit } from "../interfaces/checkout";


const apiUrl = import.meta.env.VITE_API_URL;
const prefijo = `${apiUrl}/api/user`

const createCheckout = async (formData: CheckoutSubmit) => {
    try {
    const response = await axios.post(`${prefijo}/checkout`, formData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("[createCheckout] Error fetching data:", axiosError.response?.data ?? axiosError.message);
    throw error;
  }
}

export const checkoutServices = {
  createCheckout
};
