import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";

type TextareaInputProps<T extends FieldValues> = {
  id: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

export const TextareaInput = <T extends FieldValues>({ id, placeholder, register, errors }: TextareaInputProps<T>) => {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={id}
        placeholder={placeholder}
        className={`resize-none w-full px-5 py-3 pr-20 border-4 rounded-2xl placeholder:text-[#1d1d1fb7]
          text-[#1D1D1F] text-lg font-[400] outline-none
          ${errors[id] ? "border-[#ef444472]" : "border-[#E8E8E8]"}`}
        {...register(id)}
      />
      {errors[id] && (
        <p className="text-red-500 pt-1">
          {errors[id]?.message?.toString()}
        </p>
      )}
    </div>
  );
};