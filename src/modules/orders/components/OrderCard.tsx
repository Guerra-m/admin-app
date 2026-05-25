import type { PedidoRead, EstadoPedidoCodigo } from "../types/Order";
import { FSM_TRANSITIONS, ESTADO_LABELS } from "../types/Order";

type Props = {
  order: PedidoRead;
  onAvanzar: (
    pedidoId: number,
    estado_hacia: EstadoPedidoCodigo,
    motivo?: string
  ) => void;
  isLoading?: boolean;
};

export const OrderCard = ({ order, onAvanzar, isLoading }: Props) => {
  const estado = order.estado_codigo as EstadoPedidoCodigo;
  const transiciones = FSM_TRANSITIONS[estado] ?? [];
  const nextStates = transiciones.filter((s) => s !== "CANCELADO");
  const canCancel = transiciones.includes("CANCELADO");

  return (
    <article className="rounded-lg bg-surface border border-outline-variant p-4 shadow-warm space-y-3">
      
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

        {canCancel && (
          <button
            onClick={() => {
              const motivo = window.prompt("Motivo de cancelación (obligatorio):");
              if (motivo?.trim()) {
                onAvanzar(order.id, "CANCELADO", motivo.trim());
              }
            }}
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
      </div>
    </article>
  );
};