import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryBanner } from "../components/CategoryBanner";
import { SearchInput } from "../components/SearchInput";
import { CategorySelect } from "../components/CategorySelect";
import { Products } from "../components/Products";
import { useCategories } from "../hooks/useCategories";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const { data: categories = [], isLoading, error } = useCategories();

  const handleSelectCategory = (selectedCategory: string) => {
    navigate(`/categoria/${selectedCategory}`);
  };

  const isValidCategory = categories.some(cat => category === cat.name);
  console.log(isLoading);
  console.log(error);
  
  return (
    <div className="flex flex-col gap-4">
      <CategoryBanner 
        category={category} 
        isValidCategory={isValidCategory} 
      />
      <section id="filter-Bar">
        <SearchInput
          placeholder="Busca producto o marca"
          value={search}
          onChange={setSearch} 
        />
        <CategorySelect 
          category={category} 
          isValidCategory={isValidCategory}
          categories={categories} 
          onSelect={handleSelectCategory} 
        />
      </section>
      <Products
        category={category!}
        search={search} 
      />  
    </div>
  );
};

export default Category;
