import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../../shared/api/categoria.api";
import { CATEGORIES_QUERY_KEY } from "./useCategories";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
};
