import { useState } from "react";
import { CreateProduct } from "../../components/admin/CreateProduct";
import { Plus } from "lucide-react";
import { CategorySelect } from "../../components/CategorySelect";
import { useCategories } from "../../hooks/useCategories";
import { useProductsByCat } from "../../hooks/useProductsByCat";

export default function Products() {
  const [isCreateProduct, setIsCreateProduct] = useState<boolean>(false);
  const [selectCategory, setSelectedCategory] = useState<string>("Bebidas");
  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading } = useProductsByCat(selectCategory);

  const handleSelectCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  }
  const isValidCategory = categories.some(cat => selectCategory === cat.name);

  return (
    <section className="px-4 py-3 font-outfit">
      <h3 className="text-[32px] font-bold">Productos</h3>
      <div className="mt-3">
        {!isCreateProduct ? (
          <button onClick={() => setIsCreateProduct(true)} className="flex bg-[#8DE68A] text-[#242424] px-4 py-2 rounded">
            <Plus /> Agregar nuevo producto
          </button>
        ) : (
          <CreateProduct setIsCreateProduct={setIsCreateProduct} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <CategorySelect
          category={selectCategory}
          categories={categories}
          onSelect={(handleSelectCategory)}
          isValidCategory={isValidCategory}
          navigateOnSelect={false}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {isLoading ? (
            <p>Cargando productos...</p>
          ) : products.length > 0 ? (
            products.map(pr => (
              <div key={pr.id} className="flex flex-col gap-2 outline-1 outline outline-[#E8E8E8] rounded-lg p-2">
                <img src={pr.image} alt={pr.name} className="w-full h-40 object-contain rounded-md" />
                <p>{pr.name ? pr.name : "Sin nombre"}</p>
                <button className="p-2 bg-[#8DE68A] rounded-md">
                  Editar producto
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos en esta categoría</p>
          )}
        </div>
      </div>
    </section>
  )
}
