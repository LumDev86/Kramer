const apiUrl = import.meta.env.VITE_API_URL;

const getProductsByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/categories/${category}/products`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[getProductsByCategory] Error fetching by data:", error);
    throw error;
  }
};

export const productsService = {
  getProductsByCategory,
};
