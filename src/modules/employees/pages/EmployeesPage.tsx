import { OrdersBoard } from "../components/OrdersBoard";

export const EmployeesPage = () => {
  return (
    <section className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Panel de Pedidos
      </h1>

      <OrdersBoard />
    </section>
  );
};