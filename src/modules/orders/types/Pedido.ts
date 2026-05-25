export type EstadoPedido =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "EN_PREP"
  | "EN_CAMINO"
  | "ENTREGADO"
  | "CANCELADO";

export interface PedidoRead {
  id: number;
  usuario_id: number;
  direccion_id?: number | null;
  estado_codigo: EstadoPedido;
  forma_pago_codigo: string;
  subtotal: number;
  descuento: number;
  costo_envio: number;
  total: number;
  notas?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AvanzarEstadoRequest {
  estado_hacia: EstadoPedido;
  motivo?: string;
}

export interface EstadoPedidoRead {
  codigo: EstadoPedido;
  descripcion: string;
  orden: number;
  es_terminal: boolean;
}