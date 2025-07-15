import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "../schemas/auth";
import CheckoutInput from "../components/CheckoutInput";
import { z } from "zod"
import { auth } from "../utils/auth";

export type AuthFormSchema = z.infer<typeof authFormSchema>;

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AuthFormSchema>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = (data: AuthFormSchema) => {
    console.log("data", data)
    reset()
  }

  return (
    <section>
      <h3 className="text-2xl font-bold">Registro Panel Administrativo</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-5">
        {auth.authRegisterField.map((field) => (
          <CheckoutInput
            key={field.id}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            errors={errors}
          />
        ))}
        <button type="submit" className="flex-1 px-4 flex items-center justify-center gap-2 bg-[#8DE68A] text-[#242424] rounded-full py-2">
          Registrar
        </button>
      </form>
      <div className="flex items-center gap-4 text-gray-500 my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-sm">o</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <button
        type="button"
        onClick={() => console.log("Registro con Google")}
        className="w-full flex-1 px-4 flex items-center justify-center gap-2 bg-white border border-gray-300 text-black rounded-full py-2 hover:bg-gray-100 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        Registrarme con Google
      </button>
    </section>
  )
}
