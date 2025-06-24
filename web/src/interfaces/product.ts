export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: string;
  weight: string;
  image: string;
}

export interface ProductProps {
  product: Product;
}
