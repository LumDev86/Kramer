import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Category } from "./Category";
import { Promotion } from "./Promotion";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  brand: string; 

  @Column({ type: "varchar", length: 50 })
  weight: string; 

  @Column({ type: "text" })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "int" })
  stock: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  image?: string;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @OneToOne(() => Promotion, (promotion) => promotion.product, { nullable: true })
  promotion?: Promotion;

}


