import { useState, useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { Plus } from "lucide-react";
import CategoryDetail from "../../components/admin/CategoryDetail";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import { toast } from "sonner";

export default function Categories() {
  const { data: categories = [], isLoading, refetch } = useCategories();
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [isId, setIsId] = useState<string>("");
  const [isMode, setIsMode] = useState<"create" | "edit">("create");

  const { mutate } = useDeleteCategory();

  const openCategoryForm = () => {
    setIsCreateCategory(true);
    setIsMode("create");
    setIsId("");
  };

  const closeCategoryForm = () => setIsCreateCategory(false);

  const openEditForm = (id: string) => {
    setIsCreateCategory(true);
    setIsMode("edit");
    setIsId(id);
  };

  const handleDeleteCategory = (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta categoría?");
    if (!confirmDelete) return;

    mutate(id, {
      onSuccess: () => {
        toast.success("Categoría eliminada correctamente");
        refetch();
      },
      onError: (error) => {
        toast.error("Error al eliminar la categoría");
        console.error(error);
      },
    });
  };

  useEffect(() => {
    if (!isCreateCategory) {
      setTimeout(() => {
        refetch();
      }, 0);
    }
  }, [isCreateCategory, refetch]);

  return (
    <section className="p-4">
      <h3 className="text-2xl font-bold mb-4">Categorías</h3>

      {!isCreateCategory ? (
        <button
          onClick={openCategoryForm}
          className="flex bg-[#8DE68A] text-[#242424] px-4 py-2 rounded gap-3"
        >
          <Plus /> Agregar nueva Categoría
        </button>
      ) : (
        <CategoryDetail onClose={closeCategoryForm} mode={isMode} id={isId} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {isLoading ? (
          <p>Cargando categorías...</p>
        ) : categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col gap-2 outline outline-1 outline-[#E8E8E8] rounded-lg p-2"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-contain rounded-md"
              />
              <p>{cat.name || "Sin nombre"}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => openEditForm(cat.id)}
                  className="w-full sm:flex-1 p-2 bg-[#8DE68A] rounded-md"
                >
                  Editar categoría
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="w-full sm:flex-1 p-2 bg-[#ea737d] rounded-md"
                >
                  Eliminar categoría
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay categorías.</p>
        )}
      </div>
    </section>
  );
}
