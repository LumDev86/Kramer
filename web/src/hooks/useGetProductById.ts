import { useQuery } from "@tanstack/react-query";
import { productServices } from "../services/product";
import { Product } from "../interfaces/product";

export const useGetProductById = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => productServices.getProductById(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
