import { Product } from "./cards/Product";
import { Product as Loader } from "./loaders/Product";
import { UpdatedProductsProps } from "../interfaces/product";
import { useProductsByCat } from "../hooks/useProductsByCat";
import { useFilteredProducts } from "../hooks/useFilteredProducts";

export const Products = ({
  category,
  search,
  filters,
  onResetFilters,
}: UpdatedProductsProps) => {
  const { data: products = [], isLoading, error } = useProductsByCat(category);
  const filteredProducts = useFilteredProducts(products, search, filters);

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
