import { useMutation } from "@tanstack/react-query";
import { promotionService } from "../services/promotions";
import { CreatePromotion } from "../interfaces/promotion";


export const useCreatePromotion = () => {
   return useMutation({
    mutationFn: (promotion: CreatePromotion) =>
      promotionService.createPromotion(promotion)
  });
};
