import { Category } from "./cards/Category";
import { menu } from "../utils/menu";

export const Categories = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Categorías</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {
          menu.categories.map((category, index) => (
            <Category 
              key={index}
              to={category.to} 
              label={category.label} 
              img={category.img} 
            />
          ))
        }
      </div>
    </section>
  );
};
