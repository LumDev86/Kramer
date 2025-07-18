import axios, { AxiosError } from "axios";
import { AuthLogin, AuthRegister } from "../interfaces/auth";

const apiUrl = import.meta.env.VITE_API_URL;
const prefijo = `${apiUrl}/api/admin`;

const authRegisterForAdmin = async (credentials: AuthRegister) => {
  try {
    const response = await axios.post(`${prefijo}/auth/register`, credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[authRegister] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

const authLoginForAdmin = async (credentials: AuthLogin) => {
  try {
    const response = await axios.post(`${prefijo}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "[authLogin] Error fetching data:",
      axiosError.response?.data ?? axiosError.message
    );
    throw error;
  }
};

export const authService = {
  authRegisterForAdmin,
  authLoginForAdmin,
};
