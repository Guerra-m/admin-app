import { useDroppable } from "@dnd-kit/core";
import { OrderCard } from "./OrderCard";
import type { PedidoRead, EstadoPedidoCodigo } from "../types/Order";

type Props = {
  status: EstadoPedidoCodigo;
  title: string;
  orders: PedidoRead[];
  onAvanzar: (
    pedidoId: number,
    estado_hacia: EstadoPedidoCodigo,
    motivo?: string
  ) => void;
  isLoading?: boolean;
};

export const OrderColumn = ({ status, title, orders, onAvanzar, isLoading }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="rounded-xl bg-surface-container p-3 min-h-125 flex flex-col">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-on-surface font-admin uppercase tracking-wider">
          {title}
        </h2>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
          {orders.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`
          space-y-3 flex-1 rounded-lg p-1 transition-colors duration-150
          ${isOver ? "bg-primary/5 ring-2 ring-primary/30 ring-inset" : ""}
        `}
      >
        {orders.length === 0 ? (
          <div className={`
            text-center text-xs text-on-surface-variant py-10
            border-2 border-dashed rounded-lg transition-colors duration-150
            ${isOver ? "border-primary/50 text-primary" : "border-outline-variant"}
          `}>
            {isOver ? "Soltar aquí" : "Sin pedidos"}
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onAvanzar={onAvanzar}
              isLoading={isLoading}
            />
          ))
        )}
      </div>
    </div>
  );
};
