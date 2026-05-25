import type { PedidoRead } from "../types/Pedido";
import { OrderCard } from "./OrderCard";

type Props = {
  title: string;
  orders: PedidoRead[];
  onRefresh: () => void;
};

export const OrderColumn = ({ title, orders, onRefresh }: Props) => {
  return (
    <div className="bg-surface-container p-3 rounded-xl">
      <h2 className="font-bold mb-3">{title}</h2>

      <div className="space-y-2">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onRefresh={onRefresh}
          />
        ))}
      </div>
    </div>
  );
};