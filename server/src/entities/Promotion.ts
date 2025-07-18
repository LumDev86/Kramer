import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  title: string; // Ej: "2x1", "20% OFF", "Llevá 3 pagá 2", etc.

  @Column({ type: "text", nullable: true })
  description?: string; // Explicación libre

  @Column({ type: "varchar", length: 100, nullable: true })
  type?: string; // Ej: "descuento", "combo", "regalo", etc. (opcional)

  @Column({ type: "json", nullable: true })
  data?: any;

  @OneToMany(() => Product, (product) => product.promotion)
  products: Product[];
  
}
