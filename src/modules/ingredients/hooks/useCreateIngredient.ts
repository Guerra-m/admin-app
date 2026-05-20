import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIngredient } from "../../../shared/api/ingrediente.api";
import type { IngredienteCreate } from "../types/IngredienteCreate";
import { INGREDIENTS_QUERY_KEY } from "./useIngredients";

export const useCreateIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IngredienteCreate) => createIngredient(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: INGREDIENTS_QUERY_KEY });
    },
  });
};
