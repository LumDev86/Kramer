import { UseFormRegister, FieldErrors } from "react-hook-form";
 // ajustá el path si hace falta
import CheckoutInput from "../CheckoutInput";
import { inputs } from "../../utils/inputs";

interface CategoryFormProps {
  register: UseFormRegister<{ name: string; image: File | null }>;
  errors: FieldErrors<{ name: string; image: File | null }>;
}

export const CategoryForm = ({ register, errors }: CategoryFormProps) => {
  return (
    <>
      {inputs.addCategoryFields.map((field) => (
        <CheckoutInput
          key={field.id}
          id={field.id as "name"} 
          type={field.type}
          placeholder={field.placeholder}
          register={register}
          errors={errors}
        />
      ))}
    </>
  );
};
