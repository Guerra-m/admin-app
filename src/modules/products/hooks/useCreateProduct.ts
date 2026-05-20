import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../../shared/api/producto.api";
import type { ProductoCreate } from "../types/ProductoCreate";
import { PRODUCTS_QUERY_KEY } from "./useProducts";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProductoCreate) => createProduct(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};
