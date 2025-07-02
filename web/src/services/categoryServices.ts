import { hardcodedCategories } from "../utils/hardcodedCategories";
import { hardcodedProducts } from "../utils/hardcodedProducts";

// const apiUrl = import.meta.env.VITE_API_URL;

const getAllCategories = async () => {
  try {
    // const response = await fetch(`${apiUrl}/api/categories`);
    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }

    // const data = await response.json();
    // return data.categories;
    return hardcodedCategories;
  } catch (error) {
    console.error("[getAllCategories] Error fetching by data:", error);
    throw error;
  }
};

const getProductsByCategory = async (category: string) => {
  try {
    console.log("category",category)
    // const response = await fetch(
    //   `${apiUrl}/api/categories/${category}/products`
    // );

    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }

    // const data = await response.json();
    // return data;
    return hardcodedProducts
  } catch (error) {
    console.error("[getProductsByCategory] Error fetching by data:", error);
    throw error;
  }
};

export const categoriesService = {
  getProductsByCategory,
  getAllCategories,
};
