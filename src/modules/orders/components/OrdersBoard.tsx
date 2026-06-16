import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import { OrderColumn } from "./OrderColumn";
import { useOrders } from "../hooks/useOrders";
import { useWebSocket } from "../hooks/useWebSocket";
import { useAuthStore } from "../../auth/store/authStore";
import type { EstadoPedidoCodigo } from "../types/Order";
import { ESTADO_LABELS, FSM_TRANSITIONS } from "../types/Order";
import { getApiErrorMessage } from "../../../shared/lib/apiError";

const BOARD_COLUMNS: EstadoPedidoCodigo[] = [
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREP",
  "ENTREGADO",
  "CANCELADO",
];

export const OrdersBoard = () => {
  useWebSocket();

  const user = useAuthStore((s) => s.user);
  const isPedidosOnly =
    !!user &&
    user.roles.includes("PEDIDOS") &&
    !user.roles.includes("ADMIN");

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    avanzarMutation,
  } = useOrders();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleAvanzar = (
    pedidoId: number,
    estado_hacia: EstadoPedidoCodigo,
    motivo?: string
  ) => {
    avanzarMutation.mutate({ pedidoId, estado_hacia, motivo });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const pedidoId = Number(active.id);
    const targetStatus = over.id as EstadoPedidoCodigo;

    const order = orders.find((o) => o.id === pedidoId);
    if (!order) return;

    const currentStatus = order.estado_codigo as EstadoPedidoCodigo;
    if (currentStatus === targetStatus) return;

    const validTransitions = FSM_TRANSITIONS[currentStatus] ?? [];
    if (!validTransitions.includes(targetStatus)) return;

    if (targetStatus === "CANCELADO") {
      const motivo = window.prompt("Motivo de cancelación (obligatorio):");
      if (!motivo?.trim()) return;
      avanzarMutation.mutate({ pedidoId, estado_hacia: targetStatus, motivo: motivo.trim() });
    } else {
      avanzarMutation.mutate({ pedidoId, estado_hacia: targetStatus });
    }
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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-3 overflow-x-auto min-w-0">
        {BOARD_COLUMNS.map((status) => (
          <OrderColumn
            key={status}
            status={status}
            title={ESTADO_LABELS[status]}
            orders={orders.filter((o) => o.estado_codigo === status)}
            onAvanzar={handleAvanzar}
            isLoading={avanzarMutation.isPending}
            censored={isPedidosOnly && status === "PENDIENTE"}
          />
        ))}
      </div>
    </DndContext>
  );
};
