import { useMutation } from "@tanstack/react-query";
import { productServices } from "../services/product";

export const useUpdateProduct = () => {
  return useMutation<{ message: string }, Error,{ id?: string; formData: FormData }>({
    mutationFn: ({ id, formData }) =>
      productServices.updateProduct(id ?? "", formData),
  });
};