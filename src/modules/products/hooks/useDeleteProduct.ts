import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../shared/api/producto.api";
import { PRODUCTS_QUERY_KEY } from "./useProducts";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
};
