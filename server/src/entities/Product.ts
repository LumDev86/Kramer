import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { Category } from "./Category";
import { Promotion } from "./Promotion";
import { ProductStatus } from "@enums/ProductStatus";

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

  @Column({ type: "varchar", length: 255, nullable: true })
  imagePublicId?: string;

  @Column({ type: "enum", enum: ProductStatus, default: ProductStatus.ACTIVE, })
  status: ProductStatus;

  @ManyToOne(() => Category, (category) => category.products, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "categoryId" })
  @Index()
  category: Category | null;

  @ManyToOne(() => Promotion, (promotion) => promotion.products, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "promotionId" })
  promotion?: Promotion;

}


