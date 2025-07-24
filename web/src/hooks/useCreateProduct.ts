import { useMutation } from "@tanstack/react-query";
import { productServices } from "../services/product";

export const useCreateProduct = () => {
   return useMutation<{message: string}, Error, FormData>({
    mutationFn: (formData) =>
      productServices.createProduct(formData)
  });
};
