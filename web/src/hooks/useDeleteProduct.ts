import { useMutation } from "@tanstack/react-query";
import { productServices } from "../services/product";

export const useDeleteProduct = () => {
   return useMutation({
    mutationFn: (id: string) =>
      productServices.deleteProduct(id)
  });
};
