import { useQuery } from "@tanstack/react-query";
import { promotionService } from "../services/promotions";
import { PromotionsResponse } from "../interfaces/promotion";

export const useGetPromotionById = (id: string) => {
  return useQuery<PromotionsResponse, Error>({
    queryKey: ["promotion", id],
    queryFn: () => promotionService.getPromotionById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
