import { Product } from "./product";

export interface PromotionsResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  data: {
    percent?: number;
    [key: string]: unknown;
  };
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

export interface PromotionsProducts {
  product: Product;
  promotion: PromotionsResponse;
}
