import { UseFormRegister, FieldErrors } from 'react-hook-form'
import CheckoutInput from '../CheckoutInput'
import { TextareaInput } from '../TextareaInput'
import { inputs } from '../../utils/inputs'
import { PromotionFormSchema } from '../../schemas/promotion'

interface PromotionFormProps {
  register: UseFormRegister<PromotionFormSchema>
  errors: FieldErrors<PromotionFormSchema>
  type: string
}

export const PromotionForm = ({ register, errors, type }: PromotionFormProps) => {
  return (
    <>
      <CheckoutInput
        id="title"
        type="text"
        placeholder="Titulo de la promocion"
        register={register}
        errors={errors}
      />
      <TextareaInput
        id="description"
        placeholder="Descripcion de la promocion"
        register={register}
        errors={errors}
      />
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Tipo de promocion</h2>
        {inputs.typeOptions.map((option) => (
          <div key={option.id} className="flex flex-col gap-2">
            <div className="relative flex items-center gap-2">
              <input
                id={option.id}
                type="radio"
                value={option.id}
                {...register("type")}
                className="h-6 w-6 accent-black cursor-pointer"
              />
              <label htmlFor={option.id} className="font-medium text-lg cursor-pointer">
                {option.label}
                <small>{option.id === "regalo" ? " (solo permite seleccionar el producto de regalo)" : ""}</small>
              </label>
            </div>

            {type === "descuento" && option.id === "descuento" && (
              <CheckoutInput
                key="percent"
                id="percent"
                type="number"
                placeholder="Porcentaje de la promocion"
                register={register}
                errors={errors}
              />
            )}

            {type === "combo" && option.id === "combo" && (
              <>
                <CheckoutInput
                  key="buy"
                  id="buy"
                  type="number"
                  placeholder="Cantidad de productos"
                  register={register}
                  errors={errors}
                />
                <CheckoutInput
                  key="pay"
                  id="pay"
                  type="number"
                  placeholder="Precio"
                  register={register}
                  errors={errors}
                />
              </>
            )}
            {type === "regalo" && option.id === "regalo" && (
              <>
                <div className="flex gap-2 items-center p-2 py-4 border-[3px] border-yellow-400/25 rounded-2xl bg-[#fef08a44] select-none">
                  <span className="block h-6 w-6 bg-yellow-300 rounded-full" />
                  <p className="text-yellow-600">Selecciona el producto de regalo</p>
                </div>
                <CheckoutInput
                  key="minQuantity"
                  id="minQuantity"
                  type="number"
                  placeholder="Cantidad del regalo"
                  register={register}
                  errors={errors}
                />
              </>
            )}
          </div>
        ))}
        {errors.type && (
          <p className="text-red-500 text-sm pt-1">Debes seleccionar un tipo de promocion</p>
        )}
      </div>
    </>
  )
}