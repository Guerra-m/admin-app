import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/producto.api";
import { PRODUCTS_QUERY_KEY } from "./useProducts";

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
};
