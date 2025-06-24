import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './cards/Product';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductInterface } from '../interfaces/product';
import { productsService } from '../services/productsService';

const categories = ['kiosco', 'Bebidas', 'Almacen']

export const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductInterface[]>()
  const [openCategory, setOpenCategory] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);
  const { getProductsByCategory } = productsService

  const filteredProducts = products && products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!category) return;
    const fetchProductByCategory = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategory(category);
        setProducts(data || []);
      } catch (error) {
        console.error("Error al obtener los productos por categoria:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductByCategory();
  }, [category, getProductsByCategory]);

  return (
    <>
      <input
        type='text'
        placeholder='Buscar producto...'
        className='w-full p-2 border rounded mb-4'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <section onClick={() => setOpenCategory(!openCategory)} className='select-none relative rounded-[5px] outline outline-1 outline-[#6EC3F680] flex items-center justify-between px-3 py-2 my-4 bg-[#6EC3F61A] font-outfit cursor-pointer'>
        <p>Categoría: {category}</p>
        <ChevronDown className={`${openCategory ? 'rotate-180' : ''} transition`} />
        {
          openCategory && (
            <div className='absolute top-12 left-0 rounded-[5px] w-full outline outline-1 outline-[#6EC3F680] flex flex-col bg-white z-50'>
              {categories.map((ct, i) => (
                <span
                  key={i}
                  onClick={() => {
                    setOpenCategory(false);
                    navigate(`/categoria/${ct}`);
                  }}
                  className='p-3 py-2 cursor-pointer hover:bg-[#6EC3F680]'
                >
                  {ct}
                </span>
              ))}
            </div>
          )
        }
      </section >
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