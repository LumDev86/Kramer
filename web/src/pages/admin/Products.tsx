import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutInput from "../../components/CheckoutInput";
import { inputs } from "../../utils/inputs";
import { useForm } from "react-hook-form";
import { productSchema } from "../../schemas/product";
import { z } from "zod";
import { useRef, useState } from "react";
import { Package } from "lucide-react";
import { CategorySelect } from "../../components/CategorySelect";
import { useCategories } from "../../hooks/useCategories";

export type ProductFormSchema = z.infer<typeof productSchema>;

export default function Products() {
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
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    reset()
    setPreview(null);
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
              {inputs.addProductFields.map((field) => (
                <CheckoutInput
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  register={register}
                  errors={errors}
                />
              ))}
              <div className="flex flex-col gap-1">
                <textarea
                  id="description"
                  placeholder="Descripción del Producto"
                  className={`resize-none h-40 w-full px-5 py-3 pr-20 border-4 rounded-2xl placeholder:text-[#1d1d1fb7] 
                  text-[#1D1D1F] ${errors.description ? "border-[#ef444472]" : "border-[#E8E8E8]"} outline-none text-lg font-[400] outline outline-1`}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 pt-1">
                    {errors.description?.message?.toString()}
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="flex-1">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full h-72 border-4 border-[#E8E8E8] border-dashed flex items-center justify-center cursor-pointer"
            >
              {preview ? (
                <img src={preview} alt="preview" className="object-cover h-full p-5" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Package color="#939191" size={52} />
                  <span className="text-[#939191]">Agregar imagen del producto</span>
                </div>
              )}
            </div>
            {preview && <button onClick={() => setPreview(null)} className="border border-gray-300 text-black py-1 text-center w-full rounded-md mt-2">Remover imagen</button>}
            <input
              type="file"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
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
