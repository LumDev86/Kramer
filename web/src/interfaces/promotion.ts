import { Product } from "./product";

export interface PromotionsResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  data: {
    percent?: number;
    buy?: number;
    pay?: number;
    giftProductId?: string;
    minQuantity?: number;
  };
  products: Product[];
}

export interface PromotionsProducts {
  product: Product;
  promotion?: PromotionsResponse;
}

export type CreatePromotion = Omit<PromotionsResponse, "id" | "products"> & {
  productIds: string[];
};
