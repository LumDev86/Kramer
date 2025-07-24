import { useQuery } from "@tanstack/react-query";
import { productServices } from "../services/product";
import { GetProductById } from "../interfaces/product";

export const useGetProductById = (id: string) => {
  return useQuery<GetProductById, Error>({
    queryKey: ["product", id],
    queryFn: () => productServices.getProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
