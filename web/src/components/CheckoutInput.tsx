import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form"

interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  type: string
  placeholder?: string
  defaultValue?: string
  label?: string
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export default function CheckoutInput<T extends FieldValues>({
  id,
  type,
  placeholder,
  defaultValue,
  label,
  register,
  errors
}: FormInputProps<T>) {
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
      {errors[id] && (
        <p className="text-red-500 pt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  )
}
