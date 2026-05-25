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

export const OrderColumn = ({ title, orders, onAvanzar, isLoading }: Props) => {
  return (
    <div className="rounded-xl bg-surface-container p-3 min-h-[500px] flex flex-col">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-on-surface font-admin uppercase tracking-wider">
          {title}
        </h2>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
          {orders.length}
        </span>
      </div>

      <div className="space-y-3 flex-1">
        {orders.length === 0 ? (
          <div className="text-center text-xs text-on-surface-variant py-10 border-2 border-dashed border-outline-variant rounded-lg">
            Sin pedidos
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