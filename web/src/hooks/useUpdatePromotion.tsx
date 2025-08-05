import { useMutation } from "@tanstack/react-query";
import { CreatePromotion } from "../interfaces/promotion";
import { promotionService } from "../services/promotions";

export const useUpdatePromotion = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<CreatePromotion> }) =>
      promotionService.updatePromotion(id, data),
  });
};