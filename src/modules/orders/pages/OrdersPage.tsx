import { useEffect, useState } from "react";
import { OrdersBoard } from "../components/OrdersBoard";
import { getPedidos } from "../../../shared/api/pedido.api";
import type { PedidoRead } from "../types/Pedido";

export const OrdersPage = () => {
  const [orders, setOrders] = useState<PedidoRead[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getPedidos();
      setOrders(data);
    };

    load();
  }, []);

  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Pedidos
      </h1>

      <OrdersBoard orders={orders} />
    </section>
  );
};