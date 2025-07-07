// src/entities/CartItem.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { CheckoutForm } from "./CheckoutForm";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product, { eager: true }) // eager para evitar lazy promises
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column({ type: "int", default: 1 })
  quantity: number;

  // 🟨 Carrito temporal (anónimo)
  @Column({ type: "varchar", length: 255, nullable: true })
  sessionId: string;

  // 🟩 Relación con CheckoutForm (pedido confirmado)
  @ManyToOne(() => CheckoutForm, (checkout) => checkout.cartItems, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "checkoutFormId" })
  checkoutForm?: CheckoutForm;
}

