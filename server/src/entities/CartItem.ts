import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "varchar", length: 255 })
  sessionId: string; // Identificador de carrito / sesión
}
