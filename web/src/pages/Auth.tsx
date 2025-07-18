import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema } from "../schemas/auth";
import CheckoutInput from "../components/CheckoutInput";
import { auth } from "../utils/auth";
import { useState } from "react";

export type AuthFormSchema = z.infer<typeof authFormSchema>;

export default function Auth() {
  const [toggleAuth, setToggleAuth] = useState<string>('register')
  const isRegister = toggleAuth === 'register';

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

  const handleAuthentication = () => {
    setToggleAuth(isRegister ? 'login' : 'register');
  }
  return (
    <section>
      <h3 className="text-2xl font-bold">Panel Administrativo</h3>
      <h2 className="text-xl font-semibold pt-5">{isRegister ? 'Registro' : 'Login'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 pt-2.5">
        {(isRegister ? auth.authRegisterField : auth.authLoginField).map((field) => (
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
          {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
        <button
          onClick={handleAuthentication}
          type="button"
          className="flex-1 px-4 flex items-center justify-center gap-2 border border-1 border-[#242424] text-[#242424] rounded-full py-2"
        >
          {isRegister ? 'Ya tienes cuenta?' : 'No tienes cuenta?'}
        </button>
      </form>
      <div className="flex items-center gap-4 text-gray-500 my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-lg">o</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <button
        type="button"
        onClick={() => console.log("Registro con Google")}
        className="w-full flex-1 px-4 flex items-center justify-center gap-2 bg-white border border-gray-300 text-black rounded-full py-2 hover:bg-gray-100 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        Ingresar con Google
      </button>
    </section>
  )
}
