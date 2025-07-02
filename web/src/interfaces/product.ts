export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  brand: string;
  weight: string;
  image: string;
  stock?: number
  status?: string
}

export interface ProductProps {
  product: Product;
}

export interface ProductsProps {
  category: string;
  search: string;
}
