import { Product } from "./product";

export interface PromotionsResponse {
  products: Product[];
}

export interface PromotionData {
  percent?: number;
  amount?: number;
  freeShipping?: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: string;
  data: PromotionData;
}
