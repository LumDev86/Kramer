import { useMutation } from "@tanstack/react-query";
import { checkoutServices } from "../services/checkout";
import { CheckoutSubmit } from "../interfaces/checkout";

export const useCreateCheckout = () => {
  return useMutation({
    mutationFn: (formData: CheckoutSubmit) =>
      checkoutServices.createCheckout(formData)
  });
};
