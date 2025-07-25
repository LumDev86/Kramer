import { useQuery } from "@tanstack/react-query";
import { ProductWithDetails } from "../interfaces/product";
import { promotionService } from "../services/promotions";

export const usePromotions = () => {
  return useQuery<ProductWithDetails[], Error>({
    queryKey: ["promotions"],
    queryFn: promotionService.getAllPromotions,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
