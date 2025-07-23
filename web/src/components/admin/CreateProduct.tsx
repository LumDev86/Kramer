import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCategories } from "../../hooks/useCategories";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { CategorySelect } from "../CategorySelect"
import { ImageProductUpload } from "./ImageProductUpload"
import { ProductForm } from "./ProductForm"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormSchema, productSchema } from "../../schemas/product";
import { ArrowLeft } from "lucide-react";

export const CreateProduct = ({setIsCreateProduct}: {setIsCreateProduct: (value: boolean) => void}) => {
  const { mutate } = useCreateProduct();
  const { data: categories = [] } = useCategories();
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormSchema) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === "category") continue;
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }
    formData.append("category", data.category ?? "");
    mutate(formData, {
      onSuccess: (data) => {
        console.log(data)
        toast.success(data.message);

        reset();
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: (error) => {
        toast.error(`Error al crear el producto: ${error.message}`);
      },
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("image", null);
    if (fileRef.current) fileRef.current.value = "";
  };


  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold mt-4">Agregar Producto</h2>
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
          <ImageProductUpload
            preview={preview}
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
          Agregar Producto
        </button>
      </div>
    </div>
  )
}
