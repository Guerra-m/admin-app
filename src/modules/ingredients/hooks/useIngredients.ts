import { useQuery } from "@tanstack/react-query";
import { getIngredients } from "../../../shared/api/ingrediente.api";

export const INGREDIENTS_QUERY_KEY = ["ingredients"] as const;

export const useIngredients = () => {
  return useQuery({
    queryKey: INGREDIENTS_QUERY_KEY,
    queryFn: getIngredients,
  });
};
