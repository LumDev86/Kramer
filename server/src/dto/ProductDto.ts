import { Category } from "../entities/Category";

export class ProductDto {
    name: string;
    description: string;
    brand: string;
    weight: string;
    price: number;
    stock: number;
    image?: string;
    category: Category;
    promotionId?: string; // Optional, for creating or updating products with promotions
}
  