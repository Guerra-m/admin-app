import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../../shared/api/categoria.api";
import { CATEGORIES_QUERY_KEY } from "./useCategories";

export const useCategoryById = (id: number) => {
  return useQuery({
    queryKey: [...CATEGORIES_QUERY_KEY, id],
    queryFn: () => getCategoryById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
};
