import { ProductInterface } from "../interfaces/product";

export const hardcodedProducts: ProductInterface[] = [
  {
    id: '3f89f6a6-0a89-4f7d-99d1-9267a8e5c9f3',
    name: 'Coca Cola 500ml',
    price: 3.5,
    description: 'Bebida gaseosa sabor cola',
    brand: 'Coca Cola',
    weight: '500ml',
    image: '/src/assets/images/example.png',
    stock: 10,
    status: 'available',
  },
  {
    id: 'e2db1c57-6c2c-4eaf-bd4b-d51c2482b7f9',
    name: 'Papas Lays',
    price: 2.5,
    description: 'Papas fritas sabor original',
    brand: 'Lays',
    weight: '120g',
    image: '/src/assets/images/example.png',
    stock: 20,
    status: 'available',
  },
];
