import { useNavigate, useParams } from 'react-router-dom';
// import { validCategory } from '../utils/menu';
import { useEffect, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { ProductInterface } from '../interfaces/product';
import { CategoryInterface } from '../interfaces/category';
import { Products } from '../components/Products';
import { categoriesService } from '../services/categoryServices';

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // variables
  const [getCategory, setGetCategory] = useState<CategoryInterface[]>()
  const [products, setProducts] = useState<ProductInterface[]>()
  const [search, setSearch] = useState<string>('')
  const [openCategory, setOpenCategory] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  //lifecycle
  useEffect(() => {
    if (!category) return;
    const fetchProductByCategory = async () => {
      try {
        setLoading(true);

        const allProducts = await categoriesService.getProductsByCategory(category)
        const allCategories = await categoriesService.getAllCategories()

        setProducts(allProducts || [])
        setGetCategory(allCategories || [])
      } catch (error) {
        console.error("Error al obtener los productos por categoria:", error);

        setProducts([]);
        setGetCategory([])
      } finally {
        setLoading(false);
      }
    };

    fetchProductByCategory();
  }, [category]);

  return (
    <section className='flex flex-col gap-8 my-[10px]'>
      <section className='text-4xl font-semibold font-outfit flex justify-center items-center h-[218px] bg-gradient-to-br from-[#D9F3FF] to-[#FDF0E6] rounded-2xl'>
        <p className='bg-transparent text-[#1D1D1F]'>{category}</p>
      </section>
      <section className='relative flex justify-between '>
        <input
          type='text'
          placeholder='Busca por nombre o marca'
          className='w-full px-5 py-4 pr-20 border-4 rounded-2xl placeholder:text-[#1D1D1F] text-[#1D1D1F] border-[#E8E8E8] outline-none text-lg font-[400] outline outline-1'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-md inline-flex'>
          <Search size={32} color="#242424" />
        </div>
      </section>
      <section onClick={() => setOpenCategory(!openCategory)} className='select-none relative rounded-[5px] outline outline-1 outline-[#6EC3F680] flex items-center justify-between px-3 py-2 bg-[#6EC3F61A] font-outfit cursor-pointer'>
        <p className='bg-transparent'>Categoría: {category}</p>
        <ChevronDown className={`bg-transparent ${openCategory ? 'rotate-180' : ''} transition`} />
        {
          openCategory && (
            <div className='absolute top-12 left-0 rounded-[5px] w-full outline outline-1 outline-[#6EC3F680] flex flex-col bg-white z-50'>
              {getCategory && getCategory.map((ct, i) => (
                <span
                  key={i}
                  onClick={() => {
                    setOpenCategory(false);
                    navigate(`/categoria/${ct.name}`);
                  }}
                  className='p-3 py-2 cursor-pointer hover:bg-[#6EC3F680]'
                >
                  {ct.name}
                </span>
              ))}
            </div>
          )
        }
      </section>
      <section>
        <Products
          products={products || []}
          loading={loading}
          search={search}
        />
      </section>
    </section>
  );
};
