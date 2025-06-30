import { Category } from "./cards/Category";
//import { menu } from "../utils/menu";
import { CategoryInterface } from "../interfaces/category";

type CategoriesProps = {
  categories: CategoryInterface[]
  loading: boolean
}

export const Categories = ({ categories, loading }: CategoriesProps) => {
  return (
    <section>
      {/* <h2 className="text-lg font-semibold mb-2">Categorías</h2> */}
      {loading ? (
        <div className='w-full py-10 flex justify-center items-center flex-col'>
          <p className='mt-4 text-gray-500'>Cargando categorias...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {
            categories.map((category, index) => (
              <Category
                key={index}
                to={category.name}
                label={category.name}
                img={category.image}
              />
            ))
          }
        </div>
      )}
    </section>
  );
};
