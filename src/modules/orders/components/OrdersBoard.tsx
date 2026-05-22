import { OrderColumn } from "./OrderColumn";

const orders = [
  {
    id: 1,
    cliente: "Juan",
    estado: "aprobado",
  },
  {
    id: 2,
    cliente: "Ana",
    estado: "en_proceso",
  },
  {
    id: 3,
    cliente: "Luis",
    estado: "listo",
  },
  {
    id: 4,
    cliente: "Luis",
    estado: "listo",
  },
  {
    id: 5,
    cliente: "Luis",
    estado: "aprobado",
  },
  {
    id: 6,
    cliente: "Luis",
    estado: "entregado",
  },
];

const statuses = [
  "aprobado",
  "en_proceso",
  "listo",
  "entregado",
];

export const OrdersBoard = () => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {statuses.map((status) => (
        <OrderColumn
          key={status}
          title={status}
          orders={orders.filter(
            (order) =>
              order.estado === status
          )}
        />
      ))}
    </div>
  );
};