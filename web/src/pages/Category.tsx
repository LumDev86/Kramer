import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryBanner } from "../components/CategoryBanner";
import { SearchInput } from "../components/SearchInput";
import { CategorySelect } from "../components/CategorySelect";
import { Products } from "../components/Products";
import { ProductFilters } from "../components/ProductFilters";
import { useCategories } from "../hooks/useCategories";
import { useProductsByCat } from "../hooks/useProductsByCat";
import { FilterState } from "../interfaces/product";
import { PRICE_RANGES } from "../constants/productFilters";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: null,
    sortBy: "bestsellers",
  });
  const { data: categories = [], isLoading, error } = useCategories();
  const { data: products = [] } = useProductsByCat(category!);

  const handleSelectCategory = (selectedCategory: string) => {
    navigate(`/categoria/${selectedCategory}`);
    setFilters({ priceRange: null, sortBy: "bestsellers" });
  };

  const handleResetFilters = () => {
    setFilters({ priceRange: null, sortBy: "bestsellers" });
  };

  const getFilteredCount = () => {
    if (!products) return 0;

    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.priceRange) {
      const range = PRICE_RANGES[filters.priceRange];
      if (range) {
        filtered = filtered.filter((product) => {
          const price =
            typeof product.price === "string"
              ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
              : product.price;
          return price >= range.min && price <= range.max;
        });
      }
    }

    return filtered.length;
  };

  const isValidCategory = categories.some((cat) => category === cat.name);
  console.log(isLoading);
  console.log(error);

  return (
    <div className="flex flex-col gap-4">
      <CategoryBanner category={category} isValidCategory={isValidCategory} />
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
      <ProductFilters
        filters={filters}
        onFiltersChange={setFilters}
        resultsCount={getFilteredCount()}
      />
      <Products
        category={category!}
        search={search}
        filters={filters}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};

export default Category;
