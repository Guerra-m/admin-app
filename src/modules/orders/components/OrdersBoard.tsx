import { OrderColumn } from "./OrderColumn";
import { useOrders } from "../hooks/useOrders";
import type { EstadoPedidoCodigo } from "../types/Order";
import { ESTADO_LABELS } from "../types/Order";
import { getApiErrorMessage } from "../../../shared/lib/apiError";

const BOARD_COLUMNS: EstadoPedidoCodigo[] = [
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREP",
  "EN_CAMINO",
  "ENTREGADO",
];

export const OrdersBoard = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    avanzarMutation,
  } = useOrders();

  const handleAvanzar = (
    pedidoId: number,
    estado_hacia: EstadoPedidoCodigo,
    motivo?: string
  ) => {
    avanzarMutation.mutate({ pedidoId, estado_hacia, motivo });
  };

  if (isLoading)
    return (
      <div className="rounded-lg bg-surface-container p-6 text-on-surface-variant shadow-warm">
        Cargando pedidos...
      </div>
    );

  if (isError)
    return (
      <div className="rounded-lg border border-error bg-error/10 p-4 text-error">
        Error: {getApiErrorMessage(error)}
      </div>
    );

  return (
    <div className="grid grid-cols-5 gap-3 overflow-x-auto min-w-0">
      {BOARD_COLUMNS.map((status) => (
        <OrderColumn
          key={status}
          status={status}
          title={ESTADO_LABELS[status]}
          orders={orders.filter((o) => o.estado_codigo === status)}
          onAvanzar={handleAvanzar}
          isLoading={avanzarMutation.isPending}
        />
      ))}
    </div>
  );
};