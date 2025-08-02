import { useForm } from "react-hook-form";
import { PromotionFormSchema, promotionSchema } from "../../schemas/promotion";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Package, X } from "lucide-react";
import { CategorySelect } from "../CategorySelect"
import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useProductsByCat } from "../../hooks/useProductsByCat";
import { GiftProduct, Product } from "../../interfaces/product";
import { useGetPromotionById } from "../../hooks/useGetPromotionById";
import { PromotionForm } from "./PromotionForm";
import { usePromotionForm } from "../../hooks/forms/usePromotionForm";

type PromotionDetailsProps = {
  setTooglePromotion: (state: boolean) => void,
  mode: 'create' | 'edit'
  id: string
}

export default function PromotionDetails({ mode, setTooglePromotion, id }: PromotionDetailsProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [hasSelectedProducts, setHasSelectedProducts] = useState<boolean>(false)
  const [giftProduct, setGiftProduct] = useState<GiftProduct | null>(null)
  const [hasGiftProduct, setHasGiftProduct] = useState<boolean>(false)
  const [selectCategory, setSelectedCategory] = useState<string>("Bebidas");

  const { data: categories = [] } = useCategories();
  const { data: promotion, isLoading: isPromotionById, refetch } = useGetPromotionById(id ?? "");
  const { data: products = [], isLoading: isProductsLoading } = useProductsByCat(selectCategory);

  const isCreate = mode === "create";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<PromotionFormSchema>({
    resolver: zodResolver(promotionSchema),
  });
  const type = watch("type");

  const onSuccessExternal = () => {
    reset()
    setSelectedProducts([])
    setGiftProduct(null)
    setTooglePromotion(false)
  };
  const { onSubmit } = usePromotionForm({ 
    isCreate,
    id, 
    selectedProducts, 
    giftProduct, 
    setHasGiftProduct, 
    setHasSelectedProducts,
    onSuccessExternal
  });

  useEffect(() => {
    if (!isCreate) refetch();
  }, [isCreate, refetch]);

  useEffect(() => {
    if (!isCreate && promotion) {
      reset({
        title: promotion.title,
        description: promotion.description,
        percent: String(promotion.data.percent) || "",
        type: promotion.type,
        buy: String(promotion.data.buy) || "",
        pay: String(promotion.data.pay) || "",
        minQuantity: String(promotion.data.minQuantity) || "",
      });
      setSelectedProducts(promotion.products)
      setGiftProduct({
        id: promotion.data.giftProductId || "",
      });
    }
  }, [isCreate, promotion, reset]);

  const handleSelectCategory = (selectedCategory: string) => setSelectedCategory(selectedCategory);
  const isValidCategory = categories.some(cat => selectCategory === cat.name);

  const toggleProduct = (pr: Product) => {
    if (type === "regalo") {
      setGiftProduct(pr);
      setHasGiftProduct(false)
      return;
    }

    const isAlreadySelected = selectedProducts.some(p => p.id === pr.id);
    setSelectedProducts(prev =>
      isAlreadySelected
        ? prev.filter(p => p.id !== pr.id)
        : [...prev, pr]
    );
    setHasSelectedProducts(false)
  };

  if (!isCreate) {
    if (isPromotionById) return <p>Cargando promocion...</p>;
    if (!promotion) return <p>Promocion no encontrada</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <section className="flex flex-row gap-3 w-full">
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-xl font-semibold mt-4">{isCreate ? "Crear" : "Editar"} Promocion</h2>
          <form id="add-promotion-form" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
            <PromotionForm
              register={register}
              errors={errors}
              type={type}
            />
          </form>
          <div className="flex flex-col gap-4">
            <button type="button" onClick={() => setTooglePromotion(false)} className="flex-1 px-4 flex items-center justify-center gap-2 bg-transparent text-[#242424] rounded-full py-2 border border-1 border-[#242424]">
              <ArrowLeft color="#242424" className="bg-transparent" />
              Regresar a promociones
            </button>
            <button type="submit" form="add-promotion-form" className="flex-1 px-4 flex items-center justify-center gap-2 bg-[#8DE68A] text-[#242424] rounded-full py-2">
              {isCreate ? "Crear" : "Editar"} Promocion
            </button>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mt-4 mb-8">Productos Seleccionados</h2>
          {!selectedProducts.length &&
            <div className="flex flex-col items-center justify-center gap-2">
              <Package color="#939191" size={52} />
              <span className={`${hasSelectedProducts ? "text-red-500" : "text-[#939191]"}`}>
                {hasGiftProduct ? "Debes seleccionar al menos 1 producto" : "No hay productos seleccionados"}
              </span>
            </div>
          }
          <div className="grid grid-cols-2 gap-2">
            {selectedProducts.map(pr => (
              <div key={pr.id} className="relative flex flex-col gap-2 border rounded-lg p-2 transition-colors cursor-pointer border-[#E8E8E8]">
                <X
                  className="cursor-pointer absolute top-2 right-2"
                  onClick={() => {
                    setSelectedProducts(prev =>
                      prev.filter(p => p.id !== pr.id)
                    );
                  }}
                />
                <img src={pr.image} alt={pr.name} className="w-full h-20 object-contain rounded-md" />
                <div className="flex justify-between">
                  <p>{pr.name ? pr.name : "Sin nombre"}</p>
                  <p>{pr.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            {type === "regalo" && (
              <>
                <h2 className="text-xl font-semibold mt-4 mb-3">Producto de regalo</h2>
                {!giftProduct &&
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Package color="#939191" size={52} />
                    <span className={`${hasGiftProduct ? "text-red-500" : "text-[#939191]"}`}>
                      {hasGiftProduct ? "Debes seleccionar el producto de regalo" : "No hay producto de regalo seleccionado"}
                    </span>
                  </div>
                }
                {giftProduct && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative flex flex-col gap-2 border rounded-lg p-2 transition-colors cursor-pointer border-[#E8E8E8]">
                      <X
                        className="cursor-pointer absolute top-2 right-2"
                        onClick={() => { setGiftProduct(null) }}
                      />
                      <img src={giftProduct.image || ""} alt={giftProduct.name || "No image"} className="w-full h-20 object-contain rounded-md" />
                      <div className="flex justify-between">
                        <p className="text-center">{giftProduct.name ? giftProduct.name : "Sin nombre"}</p>
                        <p>{giftProduct.price || "Sin precio"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      {/* PRODUCTOS POR CATEGORIA*/}
      <section>
        <h2 className="text-xl font-semibold mt-4">Productos</h2>
        <CategorySelect
          category={selectCategory}
          categories={categories}
          onSelect={handleSelectCategory}
          isValidCategory={isValidCategory}
          navigateOnSelect={false}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-5">
          {isProductsLoading ? (
            <p>Cargando productos...</p>
          ) : products.length > 0 ? (
            products.map(pr => {
              const isSelected = selectedProducts.some(p => p.id === pr.id);
              const isGiftSelected = giftProduct?.id === pr.id;
              const isDisabled = type === "regalo" && isSelected;

              return (
                <div
                  key={pr.id}
                  onClick={() => {
                    if (isDisabled) return;
                    toggleProduct(pr);
                  }}
                  className={`relative flex flex-col gap-2 border rounded-lg p-2 transition-colors
                    ${isDisabled
                      ? "bg-gray-200 opacity-60 cursor-not-allowed"
                      : isGiftSelected
                        ? "bg-yellow-100 border-yellow-400"
                        : isSelected
                          ? "bg-[#77a9de44] border-[#77a9de] cursor-pointer"
                          : "border-[#E8E8E8] cursor-pointer"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected || isGiftSelected}
                    className={`h-6 w-6 rounded-full cursor-pointer absolute top-3 left-3 border transition-colors pointer-events-none 
                      ${isDisabled
                        ? "border-gray-300 bg-gray-100"
                        : isGiftSelected
                          ? "bg-yellow-300 border-yellow-500"
                          : isSelected
                            ? "bg-[#77a9de] border-[#5990ca]"
                            : "border-[#E8E8E8]"
                      }
                      `}
                    readOnly
                  />
                  <img src={pr.image} alt={pr.name} className="w-full h-40 object-contain rounded-md" />
                  <p className="text-center">{pr.name ? pr.name : "Sin nombre"}</p>
                </div>
              );
            })
          ) : (
            <p>No hay productos en esta categoría</p>
          )}
        </div>
      </section>
    </div>
  )
}
