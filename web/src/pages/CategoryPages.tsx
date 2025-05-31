// src/pages/CategoryPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../components/Header";
import { ProfileSection } from "../components/ProfileSection";
import { ProductCard } from "../components/ProductCard";
import FloatingCartButton from "../components/FloatingCartButton";


const allProducts = [
  { id: 1, name: "Camisa", price: 25, description: "Camisa de algodón", brand: "Marca A", weight: "200g", image: "/images/camisa.jpg", category: "Ropa" },
  { id: 2, name: "Auriculares", price: 50, description: "Auriculares inalámbricos", brand: "Marca B", weight: "300g", image: "/images/auriculares.jpg", category: "Electrónica" },
  { id: 3, name: "Silla", price: 100, description: "Silla ergonómica", brand: "Marca C", weight: "5kg", image: "/images/silla.jpg", category: "Hogar" },
  { id: 4, name: "Camisa", price: 25, description: "Camisa de algodón", brand: "Marca A", weight: "200g", image: "/images/camisa.jpg", category: "Ropa" },
  { id: 5, name: "Auriculares", price: 50, description: "Auriculares inalámbricos", brand: "Marca B", weight: "300g", image: "/images/auriculares.jpg", category: "Electrónica" },
  { id: 6, name: "Cama", price: 100, description: "Cama ergonómica", brand: "Marca C", weight: "5kg", image: "/images/silla.jpg", category: "Hogar" }
];

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredProducts = allProducts.filter(
    (product) => product.category === category && product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
        <Header />
        <ProfileSection />
        <p className="text-center text-red-500">Categoría no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <Header />
      <ProfileSection />

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Volver
      </button>

      <h2 className="text-lg font-semibold my-4">{category}</h2>

      <input
        type="text"
        placeholder="Buscar producto..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center text-gray-500">No hay productos en esta categoría.</p>
        )}
      </div>

      <FloatingCartButton />
    </div>
  );
}
