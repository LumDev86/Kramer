import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product"; // La relación con Product

@Entity()
export class Category {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image?: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

}
