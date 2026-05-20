import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIngredient } from "../../../shared/api/ingrediente.api";
import type { IngredienteUpdate } from "../types/IngredienteUpdate";
import { INGREDIENTS_QUERY_KEY } from "./useIngredients";

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: IngredienteUpdate }) =>
      updateIngredient(id, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: INGREDIENTS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...INGREDIENTS_QUERY_KEY, variables.id],
      });
    },
  });
};
