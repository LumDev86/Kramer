import { toast } from "sonner";
import { useCreateProduct } from "../useCreateProduct";
import { useUpdateProduct } from "../useUpdateProduct";
import { ProductFormSchema } from "../../schemas/product";
import { UseFormReset } from "react-hook-form";

type useProductFormProps = {
  mode: "create" | "edit",
  id?: string,
  handleRemoveImage: () => void;
  reset: UseFormReset<ProductFormSchema>;
  onSuccessExternal?: () => void;
}

export const useProductForm = ({ mode, id, handleRemoveImage, reset, onSuccessExternal }: useProductFormProps) => {
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const isCreate = mode === "create"

  const onSubmit = (data: ProductFormSchema) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === "category" || key === "categoryId") continue;
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }
    if (isCreate) {
      formData.append("category", data.category ?? "");
    } else {
      formData.append("categoryId", data.categoryId ?? "");
    }

    const commonOptions = {
      onSuccess: (data: { message: string }) => {
        toast.success(data.message);
        reset();
        handleRemoveImage();
        onSuccessExternal?.();
      },
      onError: (error: Error) => {
        const action = isCreate ? "crear" : "editar";
        toast.error(`Error al ${action} el producto: ${error.message}`);
      },
    };

    if (!isCreate && id) {
      updateProduct({ id, formData }, commonOptions);
    } else {
      createProduct(formData, commonOptions);
    }
  };

  return { onSubmit };
};
