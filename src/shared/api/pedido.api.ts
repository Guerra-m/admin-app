import { http } from "./http";
import type {
  PedidoRead,
  EstadoPedidoRead,
  AvanzarEstadoRequest,
} from "../../modules/orders/types/Pedido";

// ─────────────────────────────
// GET PEDIDOS
// ─────────────────────────────
export const getPedidos = async (): Promise<PedidoRead[]> => {
  const res = await http.get("/api/v1/pedidos", {
    withCredentials: true,
  });

  return res.data;
};

// ─────────────────────────────
// GET ESTADOS
// ─────────────────────────────
export const getEstadosPedido = async (): Promise<
  EstadoPedidoRead[]
> => {
  const res = await http.get("/api/v1/estados-pedido", {
    withCredentials: true,
  });

  return res.data;
};

// ─────────────────────────────
// AVANZAR ESTADO
// ─────────────────────────────
export const avanzarEstadoPedido = async (
  pedidoId: number,
  data: AvanzarEstadoRequest,
) => {
  const res = await http.post(
    `/api/v1/pedidos/${pedidoId}/avanzar`,
    data,
    { withCredentials: true },
  );

  return res.data;
};