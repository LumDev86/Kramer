import { FieldErrors, UseFormRegister } from "react-hook-form"
import { CheckoutFormSchema } from "../pages/Checkout"

interface CheckoutInputProps {
  id: keyof CheckoutFormSchema
  type: string
  placeholder: string
  defaultValue?: string
  label?: string
  register: UseFormRegister<CheckoutFormSchema>
  errors: FieldErrors<CheckoutFormSchema>
};

export default function CheckoutInput({ id, type, placeholder, defaultValue, label, register, errors }: CheckoutInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id} className="text-lg">{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full px-5 py-4 pr-20 border-4 rounded-2xl placeholder:text-[#1d1d1fb7] 
        text-[#1D1D1F] ${errors[id] ? "border-[#ef444472]" : "border-[#E8E8E8]"} outline-none text-lg font-[400] outline outline-1`}
        {...register(id)}
      />
      {errors[id] && <p className="text-red-500 pt-1">{errors[id]?.message}</p>}
    </div>
  )
}
