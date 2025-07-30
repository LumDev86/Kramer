import { Category } from "./category";

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
  filters?: FilterState;
  onResetFilters?: () => void;
}

export type GetProductById = Product & { category: Category };

export type PriceRangeId = "under50" | "between50-100" | "over100";

export interface FilterState {
  priceRange: PriceRangeId | null;
  sortBy: string;
}

export interface PriceRange {
  id: PriceRangeId;
  label: string;
  min: number;
  max: number;
}

export interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

export interface UpdatedProductsProps extends ProductsProps {
  filters: FilterState;
  onResetFilters: () => void;
}
