import { avanzarEstadoPedido } from "../../../shared/api/pedido.api";
import type { EstadoPedido } from "../types/Pedido";

type Props = {
  order: {
    id: number;
    estado_codigo: EstadoPedido;
    total: number;
  };
};

export const OrderCard = ({ order }: Props) => {

  const handleAdvance = async () => {
    let nextState: EstadoPedido | null = null;

    switch (order.estado_codigo) {
      case "PENDIENTE":
        nextState = "CONFIRMADO";
        break;

      case "CONFIRMADO":
        nextState = "EN_PREP";
        break;

      case "EN_PREP":
        nextState = "LISTO";
        break;

      case "LISTO":
        nextState = "ENTREGADO";
        break;

      case "ENTREGADO":
      case "CANCELADO":
        return; // estados finales → no avanza
    }

    if (!nextState) return;

    try {
      await avanzarEstadoPedido(order.id, {
        estado_hacia: nextState,
      });

      console.log("Estado actualizado");
    } catch (err) {
      console.error("Error cambiando estado", err);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-surface-container shadow-warm">
      <h3 className="font-bold">Pedido #{order.id}</h3>

      <p>Estado: {order.estado_codigo}</p>
      <p>Total: ${order.total}</p>

      <button
        onClick={handleAdvance}
        disabled={
          order.estado_codigo === "ENTREGADO" ||
          order.estado_codigo === "CANCELADO"
        }
        className="mt-3 bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        Avanzar estado
      </button>
    </div>
  );
};