import { useState } from "react";
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

  const [cancelDialog, setCancelDialog] = useState<{
    pedidoId: number;
    targetStatus: EstadoPedidoCodigo;
  } | null>(null);
  const [cancelMotivo, setCancelMotivo] = useState("");

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
      setCancelMotivo("");
      setCancelDialog({ pedidoId, targetStatus });
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
    <>
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

      {cancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-surface rounded-xl shadow-warm p-6 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-on-surface font-admin">
              Motivo de cancelación
            </h3>
            <textarea
              value={cancelMotivo}
              onChange={(e) => setCancelMotivo(e.target.value)}
              placeholder="Ingresá el motivo..."
              rows={3}
              autoFocus
              className="w-full rounded-lg bg-surface-container border border-outline-variant p-3 text-sm resize-none outline-none focus:border-error"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setCancelDialog(null); setCancelMotivo(""); }}
                className="flex-1 py-2 rounded-lg bg-surface-container border border-outline-variant text-sm hover:bg-surface transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!cancelMotivo.trim()) return;
                  avanzarMutation.mutate({
                    pedidoId: cancelDialog.pedidoId,
                    estado_hacia: cancelDialog.targetStatus,
                    motivo: cancelMotivo.trim(),
                  });
                  setCancelDialog(null);
                  setCancelMotivo("");
                }}
                disabled={!cancelMotivo.trim() || avanzarMutation.isPending}
                className="flex-1 py-2 rounded-lg bg-error text-white text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
