import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../../shared/api/categoria.api";
import type { CategoriaUpdate } from "../types/CategoriaUpdate";
import { CATEGORIES_QUERY_KEY } from "./useCategories";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: CategoriaUpdate }) =>
      updateCategory(id, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...CATEGORIES_QUERY_KEY, variables.id],
      });
    },
  });
};
