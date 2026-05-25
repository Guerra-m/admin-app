import { http } from "./http";
import type { PedidoRead, PedidoReadDetalle } from "../../modules/orders/types/Order";

export const getPedidos = async (params?: {
  offset?: number;
  limit?: number;
}): Promise<PedidoRead[]> => {
  const res = await http.get("/api/v1/pedidos/", { params });
  return res.data;
};

export const getPedidoById = async (id: number): Promise<PedidoReadDetalle> => {
  const res = await http.get(`/api/v1/pedidos/${id}`);
  return res.data;
};

export const avanzarEstado = async (
  pedidoId: number,
  estado_hacia: string,
  motivo?: string
): Promise<PedidoRead> => {
  const res = await http.post(`/api/v1/pedidos/${pedidoId}/avanzar`, {
    estado_hacia,
    motivo,
  });
  return res.data;
};