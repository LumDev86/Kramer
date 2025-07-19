import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutInput from "../../components/CheckoutInput";
import { inputs } from "../../utils/inputs";
import { useForm } from "react-hook-form";
import { productSchema } from "../../schemas/product";
import { z } from "zod";

export type ProductFormSchema = z.infer<typeof productSchema>;

export default function Products() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormSchema) => {
    console.log("data", data)
    reset()
  }

  return (
    <section className="px-4 py-3 font-outfit">
      <h3 className="text-[32px] font-bold">Productos</h3>
      <div className="flex flex-col gap-3 w-1/2">
        <h2 className="text-xl font-semibold">Agregar Producto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
        </form>
        <button type="submit" className="flex-1 px-4 flex items-center justify-center gap-2 bg-[#8DE68A] text-[#242424] rounded-full py-3 mt-3">
          Agregar Producto
        </button>
      </div>
    </section>
  )
}
