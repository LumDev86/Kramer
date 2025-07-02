import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category";
import { Product } from "../interfaces/product";

export const useProductsByCat = (category: string) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", category],
    queryFn: () => categoryService.getProductsByCategory(category),
    staleTime: 1000 * 60 * 5, 
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
