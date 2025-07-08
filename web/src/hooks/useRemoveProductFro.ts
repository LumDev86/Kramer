import { useMutation } from "@tanstack/react-query";
import { cartService } from "../services/cart";
import { generateSessionId } from "../utils/sessionId";

export const useRemoveProductFromCart = () => {
  const sessionId = generateSessionId();

  return useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: string }) =>
      cartService.removeProductFromCart(sessionId, cartItemId),
  });
};
