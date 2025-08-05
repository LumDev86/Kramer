import { useMemo } from "react";
import { Product as ProductType, FilterState } from "../interfaces/product";
import { PRICE_RANGES } from "../constants/productFilters";

export const useFilteredProducts = (
  products: ProductType[],
  search: string,
  filters: FilterState
) => {
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.priceRange && PRICE_RANGES[filters.priceRange]) {
      const range = PRICE_RANGES[filters.priceRange];
      filtered = filtered.filter((product) => {
        const price =
          typeof product.price === "string"
            ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
            : product.price;
        return price >= range.min && price <= range.max;
      });
    }

    // Ordenar por tipo (funcionalidad futura)
    switch (filters.sortBy) {
      case "newest":
        // Nuevos productos
        break;
      case "promotions":
        // Promociones
        break;
      case "bestsellers":
        // Más vendidos
        break;
    }

    return filtered;
  }, [products, search, filters]);

  return filteredProducts;
};
