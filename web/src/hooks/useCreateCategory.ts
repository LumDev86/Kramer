import { useMutation, useQueryClient } from "@tanstack/react-query"
import { categoryService } from "../services/category"

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (FormData: FormData) => categoryService.createCategory(FormData),
        onSuccess:() => {
             queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });
}