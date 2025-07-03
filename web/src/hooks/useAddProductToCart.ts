import { useMutation } from "@tanstack/react-query";
import { cartService } from "../services/cart";
import { generateSessionId } from "../utils/sessionId";
import { AddProductToCart } from "../interfaces/cart";

export const useAddProductToCart = () => {
  const sessionId = generateSessionId();

  return useMutation({
    mutationFn: (product: AddProductToCart) =>
      cartService.addProductToCart(product, sessionId)
  });
};
