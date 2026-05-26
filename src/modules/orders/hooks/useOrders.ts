import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPedidos, avanzarEstado } from "../../../shared/api/pedido.api";

export const ORDERS_QUERY_KEY = ["orders"] as const;

export const useOrders = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: () => getPedidos({ limit: 100 }),
  });

  const avanzarMutation = useMutation({
    mutationFn: ({
      pedidoId,
      estado_hacia,
      motivo,
    }: {
      pedidoId: number;
      estado_hacia: string;
      motivo?: string;
    }) => avanzarEstado(pedidoId, estado_hacia, motivo),

    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
  });

  return {
    ...ordersQuery,
    avanzarMutation,
  };
};