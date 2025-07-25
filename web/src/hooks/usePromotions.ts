import { useQuery } from "@tanstack/react-query";
import { promotionService } from "../services/promotions";
import { PromotionsResponse } from "../interfaces/promotion";

export const usePromotions = () => {
  return useQuery<PromotionsResponse[], Error>({
    queryKey: ["promotions"],
    queryFn: promotionService.getAllPromotions,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
