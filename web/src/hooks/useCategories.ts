import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../services/category";
import { Category } from "../interfaces/category";

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: categoryService.getAllCategories,
    staleTime: 1000 * 60 * 5, 
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
