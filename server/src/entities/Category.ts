import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image?: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

