// src/services/user/checkout.user.service.ts
import { CheckoutFormRepository } from "@/repositories/CheckoutFormRepository";
import { CartItemRepository } from "@/repositories/CartItemRepository";
import { CreateCheckoutDto } from "@/dto/CheckoutDto";
import { PaymentMethod } from "@enums/PaymentMethod";

export class CheckoutService {
  async createCheckout(data: CreateCheckoutDto) {
    // Traemos cartItems con sólo los campos necesarios del producto
    const cartItems = await CartItemRepository.createQueryBuilder("cartItem")
      .leftJoinAndSelect("cartItem.product", "product")
      .select([
        "cartItem.id",
        "cartItem.quantity",
        "cartItem.sessionId",
        "product.name",
        "product.price",
        "product.image",
      ])
      .where("cartItem.sessionId = :sessionId", { sessionId: data.sessionId })
      .getMany();

    if (!cartItems || cartItems.length === 0) {
      throw new Error("No cart items found for this session");
    }

    const checkout = CheckoutFormRepository.create({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      paymentMethod: data.paymentMethod,
      sessionId: data.sessionId,
      cbu: data.cbu,
      alias: data.alias,
      accountHolderName: data.accountHolderName,
    });

    const savedCheckout = await CheckoutFormRepository.save(checkout);

    for (const item of cartItems) {
      item.checkoutForm = savedCheckout;
    }

    await CartItemRepository.save(cartItems);

    // Mapeamos para devolver sólo los campos requeridos
    const cleanItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      sessionId: item.sessionId,
      product: {
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
      },
    }));

    // Ocultar datos sensibles si el método de pago es efectivo (cash)
    const responseCheckout = { ...savedCheckout };
    if (savedCheckout.paymentMethod === PaymentMethod.CASH) {
      delete responseCheckout.cbu;
      delete responseCheckout.alias;
      delete responseCheckout.accountHolderName;
    }

    return {
      checkout: responseCheckout,
      items: cleanItems,
    };
  }
}






