import { OrderColumn } from "./OrderColumn";
import type { PedidoRead, EstadoPedido } from "../types/Pedido";

type Props = {
  orders: PedidoRead[];
};

const statuses: EstadoPedido[] = [
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREP",
  "LISTO",
  "ENTREGADO",
  "CANCELADO",
];

export const OrdersBoard = ({ orders }: Props) => {
  return (
    <div className="grid grid-cols-6 gap-4">
      {statuses.map((status) => (
        <OrderColumn
          key={status}
          title={status}
          orders={orders.filter(
            (order) => order.estado_codigo === status
          )}
        />
      ))}
    </div>
  );
};