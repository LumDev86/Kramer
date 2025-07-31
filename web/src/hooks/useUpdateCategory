// src/hooks/useUpdateCategory.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../services/category";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      categoryService.updateCategory(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("[useUpdateCategory] Error actualizando categoría:", error);
    },
  });
};
