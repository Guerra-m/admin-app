import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../../shared/api/categoria.api";
import type { CategoriaCreate } from "../types/CategoriaCreate";
import { CATEGORIES_QUERY_KEY } from "./useCategories";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CategoriaCreate) => createCategory(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
    },
  });
};
