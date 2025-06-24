import { useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "./cards/Product";

const allProducts = [
  { id: 1, name: "Camisa", price: 25, description: "Camisa de algodón", brand: "Marca A", weight: "200g", image: "/images/camisa.jpg", category: "ropa" },
  { id: 2, name: "Auriculares", price: 50, description: "Auriculares inalámbricos", brand: "Marca B", weight: "300g", image: "/images/auriculares.jpg", category: "electronica" },
  { id: 3, name: "Silla", price: 10, description: "Silla ergonómica", brand: "Marca C", weight: "5kg", image: "/images/silla.jpg", category: "hogar" },
  { id: 4, name: "Camisa", price: 50, description: "Camisa de algodón", brand: "Marca A", weight: "200g", image: "/images/camisa.jpg", category: "ropa" },
  { id: 5, name: "Auriculares", price: 100, description: "Auriculares inalámbricos", brand: "Marca B", weight: "300g", image: "/images/auriculares.jpg", category: "electronica" },
  { id: 6, name: "Cama", price: 100, description: "Cama ergonómica", brand: "Marca C", weight: "5kg", image: "/images/silla.jpg", category: "hogar" }
];

export const Products = () => {
  const { category } = useParams<{ category: string }>();
  const [search, setSearch] = useState('');
  
  const filteredProducts = allProducts.filter(product =>
    product.category === category && product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Buscar producto..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {
          filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Product key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              {search
                ? `No hay productos que coincidan con "${search}".`
                : "No hay productos para mostrar."}
            </p>
          )
        }
      </div>
    </>
  );
};
