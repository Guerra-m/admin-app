import { OrdersBoard } from "../components/OrdersBoard";

export const OrdersPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary font-store">
          Panel de Pedidos
        </h1>
        <p className="text-sm text-on-surface-variant font-admin mt-1">
          Gestión y seguimiento de pedidos en tiempo real
        </p>
      </div>

      <OrdersBoard />
    </section>
  );
};