import { useCart } from "../hooks/useCart";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import CheckoutForm from "../components/CheckoutForm";
import { generateSessionId, removeSessionId } from "../utils/sessionId";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../schemas/checkout";
import type { z } from "zod";
import { useCreateCheckout } from "../hooks/useCreateCheckout";

export type CheckoutFormSchema = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { mutate } = useCreateCheckout();
  const { total, clearCart } = useCart()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutSchema),
  });
  const paymentMethod = watch("paymentMethod")

  const onSubmit = (data: CheckoutFormSchema) => {
    const { alias, cbu, accountHolderName, ...rest } = data;
    const payload = {
      ...rest,
      sessionId: generateSessionId(),
      ...(data.paymentMethod === "mercado_pago"
        ? { alias, cbu, accountHolderName }
        : null)
    };

    mutate(
      payload,
      {
        onSuccess: (data) => {
          clearCart();
          removeSessionId();
          navigate('/')

          console.log("response del checkout desde el backend:",data)
        },
        onError: () => {
          console.error("Error al enviar los datos del checkout")
        }
      }
    )
  };

  return (
    <section className='font-outfit flex flex-col gap-8 my-[10px]'>
      <section className='text-4xl font-semibold flex justify-center items-center h-[218px] bg-gradient-to-br from-[#D9F3FF] to-[#FDF0E6] rounded-2xl'>
        <img
          src="./src/assets/logos/logo-checkout.png"
          className="w-32 h-32 bg-transparent"
        />
        <p className='bg-transparent text-[#1D1D1F]'>Checkout</p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <CheckoutForm
          register={register}
          errors={errors}
          paymentMethod={paymentMethod}
        />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Confirmación</h2>
          <div className="flex justify-between text-lg font-medium">
            <p>Productos</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-medium">
            <p>Envio</p>
            <p>$1.99</p>
          </div>
          <div className="flex justify-between text-2xl font-medium">
            <p>Total a pagar</p>
            <p className="font-bold">${(total + 1.99).toFixed(2)}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={() => navigate('/cart')} className="flex-1 px-4 flex items-center justify-center gap-2 bg-transparent text-[#242424] rounded-full py-2 border border-1 border-[#242424]">
            <ArrowLeft color="#242424" className="bg-transparent" />
            Regresar al carrito
          </button>
          <button type="submit" className="flex-1 px-4 flex items-center justify-center gap-2 bg-[#8DE68A] text-[#242424] rounded-full py-2">
            <ArrowRight color="#242424" className="bg-transparent" />
            Confirmar y pagar
          </button>
        </div>
      </form>
    </section>
  )
}
