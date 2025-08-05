import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { inputs } from "../../utils/inputs"
import CheckoutInput from "../CheckoutInput"
import { ProductFormSchema } from '../../schemas/product'
import { TextareaInput } from '../TextareaInput'

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
      <TextareaInput
        id="description"
        placeholder="Descripcion del producto"
        register={register}
        errors={errors}
      />
    </>
  )
}
