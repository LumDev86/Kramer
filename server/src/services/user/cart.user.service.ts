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

    const itemsWithSubtotal = items.map(item => ({
      id: item.id,
      product: item.product,
      quantity: item.quantity,
      subtotal: item.quantity * item.product.price,
    }));

    const total = itemsWithSubtotal.reduce((sum, item) => sum + item.subtotal, 0);

    return { items: itemsWithSubtotal, total };
  }

  async addItem(sessionId: string, productId: string, quantity: number = 1) {
    if (!productId) throw new Error("El producto es obligatorio.");
    if (quantity < 1) throw new Error("La cantidad debe ser al menos 1.");

    const product = await ProductRepository.findOne({ where: { id: productId } });
    if (!product) throw new Error("Producto no encontrado.");

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
    if (quantity < 1) throw new Error("La cantidad debe ser al menos 1.");

    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, sessionId },
      relations: ["product"],
    });

    if (!cartItem) throw new Error("El ítem del carrito no fue encontrado.");

    cartItem.quantity = quantity;
    return await this.cartRepository.save(cartItem);
  }

  async removeItem(sessionId: string, cartItemId: string) {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId, sessionId } });

    if (!cartItem) throw new Error("Ítem no encontrado en el carrito.");

    await this.cartRepository.remove(cartItem);
    return { message: "Ítem eliminado correctamente." };
  }

  async clearCart(sessionId: string) {
    await this.cartRepository.delete({ sessionId });
    return { message: "Carrito vaciado correctamente." };
  }
}


