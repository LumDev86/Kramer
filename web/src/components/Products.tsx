import { Product } from "./cards/Product";
import { Product as Loader } from "./loaders/Product";
import { ProductsProps } from "../interfaces/product";
import { useProductsByCat } from "../hooks/useProductsByCat";

export const Products = ({
  category,
  search,
}: ProductsProps) => {
  
  const { data: products = [], isLoading, error } = useProductsByCat(category);

  const filteredProducts = products && products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">Error cargando la información</p>;

  return (
    <>
      {
        filteredProducts && filteredProducts.length > 0 ? (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
              filteredProducts.map(product => (
                <Product key={product.id} product={product} />
              ))
            }
          </section>
        ) : (
          <div className="w-full py-8 flex justify-center items-center">
            <p className="text-gray-500 text-center">
              { search
                ? `No hay productos que coincidan con "${search}".`
                : "No hay productos para mostrar."
              }
            </p>
          </div>
        )
      }
    </>
  );
};
