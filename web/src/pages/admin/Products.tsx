import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "../../schemas/product";
import { CategorySelect } from "../../components/CategorySelect";
import { ProductForm } from "../../components/admin/ProductForm";
import { ImageProductUpload } from "../../components/admin/ImageProductUpload";
import { useCategories } from "../../hooks/useCategories";
import { useCreateProduct } from "../../hooks/useCreateProduct";

export type ProductFormSchema = z.infer<typeof productSchema>;

export default function Products() {
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

  return (
    <section className="px-4 py-3 font-outfit">
      <h3 className="text-[32px] font-bold">Productos</h3>
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
              setPreview={setPreview}
              fileRef={fileRef}
              handleFileChange={handleFileChange}
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
        <button type="submit" form="add-product-form" className="flex-1 px-4 flex items-center justify-center gap-2 bg-[#8DE68A] text-[#242424] rounded-full py-3 mt-3">
          Agregar Producto
        </button>
      </div>
    </section>
  )
}
