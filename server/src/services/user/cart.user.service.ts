import { CartItemRepository } from "@/repositories/CartItemRepository";
import { ProductRepository } from "@/repositories/ProductRepository";
import { Repository } from "typeorm";
import { CartItem } from "@entities/CartItem";

export class CartService {
  private cartRepository: Repository<CartItem>;

  constructor() {
    this.cartRepository = CartItemRepository;
  }

  async getCartItems(sessionId: string) {
    const items = await this.cartRepository.find({
      where: { sessionId },
      relations: ["product"],
    });

    const itemsWithSubtotal = items.map((item) => ({
      id: item.id,
      product: item.product,
      quantity: item.quantity,
      subtotal: item.quantity * item.product.price,
    }));

    const total = itemsWithSubtotal.reduce((acc, item) => acc + item.subtotal, 0);

    return {
      items: itemsWithSubtotal,
      total,
    };
  }


  async addItem(sessionId: string, productId: string, quantity: number = 1) {
    if (quantity < 1) throw new Error("Quantity must be at least 1");
    if (!productId) throw new Error("ProductId is required");

    const product = await ProductRepository.findOne({ where: { id: productId } });
    if (!product) throw new Error("Product not found");

    console.log(`Adding item to cart: product=`, product);

    let cartItem = await this.cartRepository.findOne({
      where: { sessionId, product: { id: productId } },
      relations: ["product"],
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepository.create({ sessionId, product, quantity });
    }

    return await this.cartRepository.save(cartItem);
  }

  async updateItem(sessionId: string, cartItemId: string, quantity: number) {
    if (quantity < 1) throw new Error("Quantity must be at least 1");

    const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId, sessionId }, relations: ["product"] });
    if (!cartItem) throw new Error("Cart item not found");

    cartItem.quantity = quantity;
    return await this.cartRepository.save(cartItem);
  }

  async removeItem(sessionId: string, cartItemId: string) {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId, sessionId } });
    if (!cartItem) throw new Error("Cart item not found");

    await this.cartRepository.delete(cartItemId);
    return { message: "Cart item removed successfully" };
  }

  async clearCart(sessionId: string) {
    await this.cartRepository.delete({ sessionId });
    return { message: "Cart cleared" };
  }
}

