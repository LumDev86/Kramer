// Order.ts (Entidad)
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 20 })
  phoneNumber: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  address: string;

  @Column({ type: "enum", enum: ["Efectivo", "MercadoPago"] })
  paymentMethod: "Efectivo" | "MercadoPago";

  @Column({ type: "varchar", length: 255, nullable: true })
  email?: string;

  @ManyToMany(() => Product)
  @JoinTable({ name: "order_products" })
  products: Product[];

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;
}
