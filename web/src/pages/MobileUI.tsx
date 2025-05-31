// src/pages/MobileUI.tsx
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ProfileSection } from "../components/ProfileSection";
import { CategoryCard } from "../components/CategoryCard";
import FloatingCartButton from "../components/FloatingCartButton";

const categories = [
  { name: "Ropa", image: "/images/categoria-ropa.jpg" },
  { name: "Electrónica", image: "/images/categoria-electronica.jpg" },
  { name: "Hogar", image: "/images/categoria-hogar.jpg" },
];

export default function MobileUI() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <Header />
      <ProfileSection />
      <section>
        <h3 className="text-lg font-semibold mb-2">Categorías</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <CategoryCard key={index} name={cat.name} image={cat.image} onClick={() => navigate(`/categoria/${cat.name}`)} />
          ))}
        </div>
      </section>
      <FloatingCartButton />
    </div>
  );
}

