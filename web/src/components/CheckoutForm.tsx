import { UseFormRegister, FieldErrors } from 'react-hook-form'
import CheckoutInput from './CheckoutInput'
import { CheckoutFormSchema } from '../pages/Checkout'
import { inputs } from '../utils/inputs'

interface CheckoutFormProps {
  register: UseFormRegister<CheckoutFormSchema>
  errors: FieldErrors<CheckoutFormSchema>
  paymentMethod: string
}

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
                {...register("paymentMethod", { required: true })}
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
              <div className="flex flex-col gap-4 pl-8">
                {inputs.mercadoPagoFields.map((field) => (
                  <CheckoutInput
                    key={field.id}
                    id={field.id}
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    defaultValue={field.defaultValue}
                    register={register}
                    errors={errors}
                  />
                ))}
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
