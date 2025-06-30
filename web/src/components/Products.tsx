import { Product } from './cards/Product';
import { ProductInterface } from '../interfaces/product';

type ProductsProps = {
  products: ProductInterface[]
  search: string
  loading: boolean
}

export const Products = ({ products, search, loading }: ProductsProps) => {

  const filteredProducts = products && products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <div className='w-full py-10 flex justify-center items-center flex-col'>
          <div className="border-4 border-[#6EC3F680] border-l-transparent w-24 h-24 rounded-[50%] animate-spin"></div>
          <p className='mt-4 text-gray-500'>Cargando productos...</p>
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {filteredProducts.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className='w-full py-8 flex justify-center items-center'>
          <p className='text-gray-500 text-center'>
            {search
              ? `No hay productos que coincidan con '${search}'.`
              : 'No hay productos para mostrar.'}
          </p>
        </div>
      )}
    </>
  );
};
