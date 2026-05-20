import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../shared/api/producto.api";

export const PRODUCTS_QUERY_KEY = ["products"] as const;

export const useProducts = (params?: {
  min_precio?: number;
  max_precio?: number;
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, params],
    queryFn: () => getProducts(params),
  });
};
