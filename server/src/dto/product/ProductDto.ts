import { Category } from "@entities/Category";
import { ProductStatus } from "@enums/ProductStatus";

export class ProductDto {
    name: string;
    description: string;
    brand: string;
    weight: string;
    price: number;
    stock: number;
    image?: string;
    status?: ProductStatus;
    category: Category;
    promotionId?: string; // Optional, for creating or updating products with promotions
}
  