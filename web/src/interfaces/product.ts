export interface ProductInterface {
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
  product: ProductInterface;
}
