import { Category } from "../entities/Category";

export class ProductDto {
    name: string;
    description: string;
    price: number;
    stock: number;
    image?: string;
    category: Category;
}
  