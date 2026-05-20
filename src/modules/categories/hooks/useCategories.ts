import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../shared/api/categoria.api";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;

export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
  });
};
