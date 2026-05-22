import { OrdersBoard } from "../components/OrdersBoard";

export const OrdersPage = () => {
  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Pedidos
      </h1>

      <OrdersBoard />
    </section>
  );
};