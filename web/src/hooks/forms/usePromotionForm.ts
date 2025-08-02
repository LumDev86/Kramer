import { toast } from "sonner"
import { PromotionFormSchema } from "../../schemas/promotion"
import { useCreatePromotion } from "../useCreatePromotion"
import { useUpdatePromotion } from "../useUpdatePromotion"
import { GiftProduct, Product } from "../../interfaces/product"


interface usePromotionFormProps {
  isCreate: boolean
  id?: string
  selectedProducts: Product[]
  giftProduct: GiftProduct | null
  setHasGiftProduct: (v: boolean) => void
  setHasSelectedProducts: (v: boolean) => void
  onSuccessExternal?: () => void;
}

export const usePromotionForm = ({
  isCreate,
  id = "",
  selectedProducts,
  giftProduct,
  setHasGiftProduct,
  setHasSelectedProducts,
  onSuccessExternal
}: usePromotionFormProps) => {
  const { mutate: createPromotion } = useCreatePromotion();
  const { mutate: updatePromotion } = useUpdatePromotion();

  const onSubmit = (data: PromotionFormSchema) => {
    if (!selectedProducts.length) {
      setHasSelectedProducts(true)
      return
    }

    if (data.type === "regalo" && !giftProduct) {
      setHasGiftProduct(true)
      return
    }

    const payload = {
      title: data.title,
      description: data.description,
      type: data.type,
      data:
        data.type === "descuento"
          ? { percent: Number(data.percent) }
          : data.type === "combo"
          ? { buy: Number(data.buy), pay: Number(data.pay) }
          : { giftProductId: giftProduct?.id, minQuantity: Number(data.minQuantity) },
      productIds: selectedProducts.map((pr) => pr.id),
    }

    const onSuccess = () => {
      toast.success(`Promoción ${isCreate ? "creada" : "actualizada"}!`)
      onSuccessExternal?.();
    }

    const onError = (error: Error) => {
      toast.error(`Error al ${isCreate ? "crear" : "editar"} la promoción: ${error.message}`)
    }

    if (isCreate) {
      createPromotion(payload, { onSuccess, onError })
    } else {
      updatePromotion({ id, data: payload }, { onSuccess, onError })
    }
  }

  return { onSubmit }
}
