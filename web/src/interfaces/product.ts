import { Category } from "./category";
import { Promotion } from "./promotion";

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  brand: string;
  weight: string;
  image: string;
  stock?: number;
  status?: string;
}

export interface ProductProps {
  product: Product;
}

export interface ProductsProps {
  category: string;
  search: string;
}

export type GetProductById = Product & { category: Category };
export interface ProductWithDetails extends Product {
  imagePublicId?: string | null;
  category?: Category;
  promotion?: Promotion;
}

export interface ProductPropsWithDetails {
  product: ProductWithDetails;
}
