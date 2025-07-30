import { Product } from "./cards/Product";
import { Product as Loader } from "./loaders/Product";
import { FilterState, ProductsProps } from "../interfaces/product";
import { useProductsByCat } from "../hooks/useProductsByCat";
import { priceRanges } from "../constants/productFilters";

interface UpdatedProductsProps extends ProductsProps {
  filters: FilterState;
  onResetFilters: () => void;
}

export const Products = ({
  category,
  search,
  filters,
  onResetFilters,
}: UpdatedProductsProps) => {
  const { data: products = [], isLoading, error } = useProductsByCat(category);

  const getFilteredProducts = () => {
    if (!products) return [];

    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Filtrar por rango de precios
    if (filters.priceRange && priceRanges[filters.priceRange]) {
      const range = priceRanges[filters.priceRange];
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
        // Nuevos Productos
        break;
      case "promotions":
        // Promociones
        break;
      case "bestsellers":
        // Más vendidos
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500 text-center">Error cargando la información</p>
    );

  return (
    <>
      {filteredProducts && filteredProducts.length > 0 ? (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <section className="w-full flex flex-col justify-center">
          {!search && (
            <>
              <p className="font-medium text-2xl">
                No encontramos productos que coincidan
              </p>
              <p className="text-lg my-2">
                Intenta cambiar los filtros o buscar algo diferente
              </p>
            </>
          )}
          {(filters.priceRange || filters.sortBy !== "bestsellers") && (
            <button
              onClick={onResetFilters}
              className="font-medium py-2 border-[1.5px] border-black
              rounded-full text-gray-700 hover:bg-[#6EC3F61A] transition-colors"
            >
              Restablecer filtros
            </button>
          )}
        </section>
      )}
    </>
  );
};
