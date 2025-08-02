import { useMutation } from "@tanstack/react-query";
import { promotionService } from "../services/promotions";

export const useDeletePromotion = () => {
   return useMutation({
    mutationFn: (id: string) =>
      promotionService.deletePromotion(id)
  });
};
