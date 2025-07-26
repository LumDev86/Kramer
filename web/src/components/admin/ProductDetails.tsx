import { useCallback, useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { CategorySelect } from "../CategorySelect"
import { ImageUpload } from "./ImageUpload"
import { ProductForm } from "./ProductForm"
import { ArrowLeft } from "lucide-react";
import { useGetProductById } from "../../hooks/useGetProductById";
import { useImageUpload } from "../../hooks/forms/useImageUpload";
import { useProductForm } from "../../hooks/forms/useProductForm";
import { useForm } from "react-hook-form";
import { ProductFormSchema, productSchema } from "../../schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";

type ProductDetailsProps = {
  setIsCreateProduct: (value: boolean) => void
  mode: 'create' | 'edit'
  id?: string
}

export const ProductDetails = ({ setIsCreateProduct, mode, id }: ProductDetailsProps) => {
  const { data: product, isLoading } = useGetProductById(id ?? "");
  const { data: categories = [] } = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productSchema),
  });

  const setImageValue = useCallback((_name: string, value: File | null) => {
    setValue("image", value);
  }, [setValue]);

  const onSuccessExternal = () => {
    setIsCreateProduct(false);
  };


  const { preview, setPreview, handleFileChange, handleRemoveImage, fileRef } = useImageUpload(setImageValue)
  const { onSubmit } = useProductForm({ mode, id, handleRemoveImage, reset, onSuccessExternal });


  const isCreate = mode === "create"

  useEffect(() => {
    if (!isCreate && product) {
      if (product.image) setPreview(product.image);
      reset({
        name: product.name,
        brand: product.brand,
        weight: product.weight,
        stock: product.stock,
        price: Number(product.price),
        description: product.description,
        image: product.image,
        category: product.category.name,
        categoryId: product.category.id
      });
    }
  }, [isCreate, product, reset, setPreview]);

  useEffect(() => {
    if (isCreate) {
      reset();
      handleRemoveImage();
    }
  }, [isCreate, handleRemoveImage, reset]);

  if (!isCreate) {
    if (isLoading) return <p>Cargando producto...</p>;
    if (!product) return <p>Producto no encontrado</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold mt-4">{isCreate ? "Crear" : "Editar"} Producto</h2>
      <section className="flex gap-3">
        <div className="flex-1">
          <form id="add-product-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <ProductForm
              register={register}
              errors={errors}
            />
          </form>
        </div>
        <div className="flex-1">
          <ImageUpload
            preview={preview}
            alt={product?.name || "Sin nombre"}
            fileRef={fileRef}
            handleFileChange={handleFileChange}
            onRemoveImage={handleRemoveImage}
          />
          <CategorySelect
            category={watch("category")}
            isValidCategory={!!watch("category")}
            categories={categories}
            onSelect={(value) => setValue("category", value)}
            navigateOnSelect={false}
          />
        </div>
      </section>
      <div className="flex gap-4">
        <button type="button" onClick={() => setIsCreateProduct(false)} className="flex-1 px-4 flex items-center justify-center gap-2 bg-transparent text-[#242424] rounded-full py-2 border border-1 border-[#242424]">
          <ArrowLeft color="#242424" className="bg-transparent" />
          Regresar a productos
        </button>
        <button type="submit" form="add-product-form" className="flex-1 px-4 flex items-center justify-center gap-2 bg-[#8DE68A] text-[#242424] rounded-full py-2">
          {isCreate ? "Crear" : "Editar"} Producto
        </button>
      </div>
    </div>
  )
}
