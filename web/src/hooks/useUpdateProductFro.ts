import { useMutation } from "@tanstack/react-query";
import { cartService } from "../services/cart";
import { generateSessionId } from "../utils/sessionId";
import { UpdateProductFromCart } from "../interfaces/cart";

export const useUpdateProductFromCart = () => {
  const sessionId = generateSessionId();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: UpdateProductFromCart) =>
      cartService.updateProductFromCart(sessionId, cartItemId, quantity),
  });
};