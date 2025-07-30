import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, CreateDateColumn, } from "typeorm";
import { PaymentMethod } from "@enums/PaymentMethod";
import { CartItem } from "./CartItem";

@Entity()
export class CheckoutForm {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  fullName: string;

  @Column({ type: "varchar", length: 50 })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "enum", enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 255 })
  sessionId: string;

  // 🟪 Opcionales si el método es 'mercado_pago'
  @Column({ type: "varchar", length: 50, nullable: true })
  cbu?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  alias?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  accountHolderName?: string;

  @CreateDateColumn()
  createdAt: Date;

  // 🔁 Relación inversa
  @OneToMany(() => CartItem, (cartItem) => cartItem.checkoutForm)
  cartItems: CartItem[];
}

