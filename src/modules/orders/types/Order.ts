export interface DetallePedidoRead {
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  nombre_snapshot: string;
  precio_snapshot: number;
  subtotal_snap: number;
  personalizacion?: number[] | null;
  created_at: string;
}

export interface HistorialEstadoPedidoRead {
  id: number;
  pedido_id: number;
  estado_desde: string | null;
  estado_hacia: string;
  usuario_id: number | null;
  motivo: string | null;
  created_at: string;
}

export interface PedidoRead {
  id: number;
  usuario_id: number;
  direccion_id: number | null;
  estado_codigo: string;
  forma_pago_codigo: string;
  subtotal: number;
  descuento: number;
  costo_envio: number;
  total: number;
  notas: string | null;
  created_at: string;
  updated_at: string;
}

export interface PedidoReadDetalle extends PedidoRead {
  detalles: DetallePedidoRead[];
  historial: HistorialEstadoPedidoRead[];
}

export type EstadoPedidoCodigo =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "EN_PREP"
  | "EN_CAMINO"
  | "ENTREGADO"
  | "CANCELADO";

export const FSM_TRANSITIONS: Record<EstadoPedidoCodigo, EstadoPedidoCodigo[]> = {
  PENDIENTE:  ["CONFIRMADO", "CANCELADO"],
  CONFIRMADO: ["EN_PREP",    "CANCELADO"],
  EN_PREP:    ["ENTREGADO",  "CANCELADO"],
  EN_CAMINO:  ["ENTREGADO",  "CANCELADO"],
  ENTREGADO:  [],
  CANCELADO:  [],
};

export const ESTADO_LABELS: Record<EstadoPedidoCodigo, string> = {
  PENDIENTE:  "Pendiente",
  CONFIRMADO: "Confirmado",
  EN_PREP:    "En Preparación",
  EN_CAMINO:  "En Camino",
  ENTREGADO:  "Entregado",
  CANCELADO:  "Cancelado",
};

export const ESTADO_COLORS: Record<EstadoPedidoCodigo, string> = {
  PENDIENTE:  "bg-yellow-100 text-yellow-800",
  CONFIRMADO: "bg-blue-100   text-blue-800",
  EN_PREP:    "bg-orange-100 text-orange-800",
  EN_CAMINO:  "bg-purple-100 text-purple-800",
  ENTREGADO:  "bg-tertiary/10 text-tertiary",
  CANCELADO:  "bg-error/10   text-error",
};