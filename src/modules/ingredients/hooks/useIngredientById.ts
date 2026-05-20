import { useQuery } from "@tanstack/react-query";
import { getIngredientById } from "../../../shared/api/ingrediente.api";
import { INGREDIENTS_QUERY_KEY } from "./useIngredients";

export const useIngredientById = (id: number) => {
  return useQuery({
    queryKey: [...INGREDIENTS_QUERY_KEY, id],
    queryFn: () => getIngredientById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
};
