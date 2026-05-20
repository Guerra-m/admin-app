import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIngredient } from "../../../shared/api/ingrediente.api";
import { INGREDIENTS_QUERY_KEY } from "./useIngredients";

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteIngredient(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: INGREDIENTS_QUERY_KEY });
    },
  });
};
