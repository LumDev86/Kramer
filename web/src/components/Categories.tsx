import { Category } from "./cards/Category";
import { Category as Loader } from "./loaders/Category";
import { useCategories } from "../hooks/useCategories";

export const Categories = () => {
  const { data = [], isLoading, error } = useCategories();

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Error cargando la información</p>;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {
        data.map(category => (
          <Category key={category.id} category={category} />
        ))
      }
    </section>
  );
};
