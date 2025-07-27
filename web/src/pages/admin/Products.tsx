import { useState, useEffect } from "react";
import { ProductDetails } from "../../components/admin/ProductDetails";
import { Plus } from "lucide-react";
import { CategorySelect } from "../../components/CategorySelect";
import { useCategories } from "../../hooks/useCategories";
import { useProductsByCat } from "../../hooks/useProductsByCat";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import { toast } from "sonner";

export default function Products() {
  const [isId, setIsId] = useState<string>("")
  const [isMode, setIsMode] = useState<"create" | "edit">("create")
  const [isCreateProduct, setIsCreateProduct] = useState<boolean>(false);
  const [selectCategory, setSelectedCategory] = useState<string>("Bebidas");
  const { data: categories = [] } = useCategories();
  const { data: products = [], isLoading, refetch } = useProductsByCat(selectCategory);
  const { mutate } = useDeleteProduct();

  const handleDeleteProduct = (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (!confirmDelete) return;

    mutate(id,
      {
        onSuccess: () => {
          toast.success("producto eliminado")
          refetch()
        },
        onError: (error) => {
          toast.error(`error: ${error}`)
          console.error(error)
        }
      })
  }

  const handleSelectCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  }
  const isValidCategory = categories.some(cat => selectCategory === cat.name);

  const openProductDetails = (mode: "create" | "edit", id: string = "") => {
    setIsCreateProduct(true);
    setIsMode(mode);
    setIsId(id);
  };

  useEffect(() => {
    if (!isCreateProduct) {
      setTimeout(() => {
        refetch();
      }, 0);
    }
  }, [isCreateProduct, refetch]);


  return (
    <section className="px-4 py-3 font-outfit">
      <h3 className="text-[32px] font-bold">Productos</h3>
      <div className="mt-3">
        {!isCreateProduct ? (
          <>
            <button onClick={() => openProductDetails("create")} className="flex bg-[#8DE68A] text-[#242424] px-4 py-2 rounded">
              <Plus /> Agregar nuevo producto
            </button>
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
                      <div className="flex justify-between gap-2">
                        <button onClick={() => openProductDetails("edit", pr.id)} className="flex-1 p-2 bg-[#8DE68A] rounded-md">
                          Editar producto
                        </button>
                        <button onClick={() => handleDeleteProduct(pr.id)} className="flex-1 p-2 bg-[#ea737d] rounded-md">
                          Eliminar producto
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay productos en esta categoría</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <ProductDetails key={isMode} setIsCreateProduct={setIsCreateProduct} mode={isMode} id={isId ?? ""} />
        )}
      </div>
    </section >
  )
}
