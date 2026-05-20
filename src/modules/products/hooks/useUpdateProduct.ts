import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../../shared/api/producto.api";
import type { ProductoUpdate } from "../types/ProductoUpdate";
import { PRODUCTS_QUERY_KEY } from "../hooks/useProducts";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ProductoUpdate }) =>
      updateProduct(id, payload),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...PRODUCTS_QUERY_KEY, variables.id],
      });
    },
  });
};
