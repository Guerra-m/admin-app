import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { PedidoRead, EstadoPedidoCodigo } from "../types/Order";
import { FSM_TRANSITIONS, ESTADO_LABELS } from "../types/Order";
import { useAuthStore } from "../../auth/store/authStore";

const ADMIN_ONLY_CANCEL_FROM: EstadoPedidoCodigo[] = ["EN_PREP", "EN_CAMINO"];

type Props = {
  order: PedidoRead;
  onAvanzar: (
    pedidoId: number,
    estado_hacia: EstadoPedidoCodigo,
    motivo?: string
  ) => void;
  isLoading?: boolean;
  censored?: boolean;
};

export const OrderCard = ({ order, onAvanzar, isLoading, censored = false }: Props) => {
  const user = useAuthStore((s) => s.user);
  const isPedidosOnly =
    !!user &&
    user.roles.includes("PEDIDOS") &&
    !user.roles.includes("ADMIN");

  const [showCancel, setShowCancel] = useState(false);
  const [motivo, setMotivo] = useState("");

  const estado = order.estado_codigo as EstadoPedidoCodigo;
  const transiciones = FSM_TRANSITIONS[estado] ?? [];
  const nextStates = transiciones.filter((s) => s !== "CANCELADO");
  const canCancel =
    transiciones.includes("CANCELADO") &&
    !(isPedidosOnly && ADMIN_ONLY_CANCEL_FROM.includes(estado));

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: order.id, disabled: censored });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  if (censored) {
    return (
      <article className="rounded-lg bg-surface border border-outline-variant p-4 shadow-warm space-y-3 select-none">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-on-surface font-admin text-sm">
            Pedido #{order.id}
          </h3>
          <div className="h-4 w-14 rounded bg-outline-variant/50 animate-pulse" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3 w-3/4 rounded bg-outline-variant/40 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-outline-variant/40 animate-pulse" />
        </div>

        <div className="flex items-center justify-center gap-2 py-2 rounded-md bg-surface-container border border-outline-variant text-xs text-on-surface-variant">
          <span>🔒</span>
          <span className="font-medium">Sin acceso</span>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        rounded-lg bg-surface border border-outline-variant p-4 shadow-warm space-y-3
        cursor-grab active:cursor-grabbing select-none
        transition-shadow
        ${isDragging ? "opacity-50 shadow-2xl rotate-1 z-50 relative" : ""}
      `}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-on-surface font-admin text-sm">
          Pedido #{order.id}
        </h3>
        <span className="text-sm font-bold text-primary">
          ${order.total.toFixed(2)}
        </span>
      </div>

      <div className="text-xs text-on-surface-variant space-y-0.5">
        <p>Pago: {order.forma_pago_codigo}</p>
        <p>{new Date(order.created_at).toLocaleDateString("es-AR")}</p>
        {order.notas && <p className="italic">"{order.notas}"</p>}
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        {nextStates.map((hacia) => (
          <button
            key={hacia}
            onClick={() => onAvanzar(order.id, hacia)}
            disabled={isLoading}
            className="
              rounded-md bg-primary text-on-primary
              text-xs px-3 py-1.5 font-semibold
              hover:opacity-90 disabled:opacity-50
              transition-all active:scale-95
            "
          >
            → {ESTADO_LABELS[hacia]}
          </button>
        ))}

        {canCancel && !showCancel && (
          <button
            onClick={() => setShowCancel(true)}
            disabled={isLoading}
            className="
              rounded-md bg-error/10 text-error
              border border-error/30
              text-xs px-3 py-1.5 font-semibold
              hover:bg-error hover:text-white
              disabled:opacity-50 transition-all active:scale-95
            "
          >
            Cancelar pedido
          </button>
        )}

        {canCancel && showCancel && (
          <div
            className="rounded-md border border-error/30 bg-error/5 p-2 space-y-2"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold text-error">Motivo de cancelación</p>
            <textarea
              placeholder="Ingresá el motivo..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={2}
              className="w-full text-xs rounded p-1.5 bg-surface border border-outline-variant resize-none outline-none focus:border-error"
            />
            <div className="flex gap-1.5">
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => { setShowCancel(false); setMotivo(""); }}
                className="flex-1 text-xs py-1 rounded border border-outline-variant bg-surface-container hover:bg-surface transition-colors"
              >
                No
              </button>
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  if (!motivo.trim()) return;
                  onAvanzar(order.id, "CANCELADO", motivo.trim());
                  setShowCancel(false);
                  setMotivo("");
                }}
                disabled={!motivo.trim() || isLoading}
                className="flex-1 text-xs py-1 rounded bg-error text-white disabled:opacity-50 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
