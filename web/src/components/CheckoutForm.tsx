import { CheckoutFormProps } from '../interfaces/checkout'
import CheckoutInput from './CheckoutInput'
import { inputs } from '../utils/inputs'

export default function CheckoutForm({ register, errors, paymentMethod }: CheckoutFormProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Datos personales</h2>
        {inputs.personalFields.map((field) => (
          <CheckoutInput
            key={field.id}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            errors={errors}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Pago</h2>

        {inputs.paymentOptions.map((option) => (
          <div key={option.id} className="flex flex-col gap-2">
            <div className="relative flex items-center gap-2">
              <input
                id={option.id}
                type="radio"
                value={option.value}
                {...register("paymentMethod")}
                className="h-6 w-6 accent-black cursor-pointer"
              />
              <label htmlFor={option.id} className="font-medium text-lg cursor-pointer">{option.label}</label>
            </div>

            {paymentMethod === "cash" && option.value === "cash" && (
              <p className="text-lg font-medium pl-8">
                Nota: Si hay promociones futuras podrás recibirlas por WhatsApp o email.
              </p>
            )}

            {paymentMethod === "mercado_pago" && option.value === "mercado_pago" && (
              <div className="p-[5px] bg-gradient-to-b from-[#D9F3FF] to-[#FDF0E6] rounded-[21px]">
                <div className="bg-[#FDFBFF] rounded-[21px] flex flex-col py-4 pl-4 gap-2">
                  {inputs.mercadoPagoFields.map((field, i) => (
                    <div key={i} className="flex flex-col">
                      <p className='text-lg font-bold'>{field.label}</p>
                      <p className='text-lg'>{field.defaultValue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm pt-1">Debes seleccionar un método de pago</p>
        )}
      </div>
    </>
  )
}
