import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { inputs } from "../../utils/inputs"
import { ProductFormSchema } from '../../pages/admin/Products'
import CheckoutInput from "../CheckoutInput"

interface ProductFormProps {
  register: UseFormRegister<ProductFormSchema>
  errors: FieldErrors<ProductFormSchema>
}

export const ProductForm = ({ register, errors }: ProductFormProps) => {
  return (
    <>
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
            text-[#1D1D1F] ${errors.description ? "border-[#ef444472]" : "border-[#E8E8E8]"} outline-none text-lg font-[400] outline
            outline-1`}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 pt-1">
            {errors.description?.message?.toString()}
          </p>
        )}
      </div>
    </>
  )
}
