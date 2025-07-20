import { useMutation } from "@tanstack/react-query";
import { productServices } from "../services/product";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      productServices.createProduct(formData)
  });
};
