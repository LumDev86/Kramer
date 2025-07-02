import { CategoryInterface } from "../interfaces/category";
import { useNavigate } from "react-router-dom";

type CategoriesProps = {
  categories: CategoryInterface[]
  loading: boolean
}

export const Categories = ({ categories, loading }: CategoriesProps) => {
  const navigate = useNavigate();
  const handleClick = (to: string) => navigate(`/categoria/${to}`);

  return (
    <section>
      {loading ? (
        <div className='w-full py-10 flex justify-center items-center flex-col'>
          <p className='mt-4 text-gray-500'>Cargando categorias...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {
            categories.map((c, index) => (
              <div key={index} className='bg-[#6EC3F64D] h-[134px] relative rounded-lg cursor-pointer flex flex-col justify-center items-center font-outfit gap-3' onClick={() => handleClick(c.name)}>
                <img src={c.image} alt={c.name} className='bg-transparent' />
                <div className='bg-transparent flex items-center justify-center'>
                  <p className='text-[##171717] text-lg font-semibold bg-transparent'>{c.name}</p>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </section>
  );
};
