export type UnidadMedidaTipo = "peso" | "volumen" | "contable";

export type UnidadMedidaRead = {
  id: number;
  nombre: string;
  simbolo: string;
  tipo: UnidadMedidaTipo;
  created_at: string;
};

export type UnidadMedidaCreate = {
  nombre: string;
  simbolo: string;
  tipo: string;
};

export type UnidadMedidaUpdate = Partial<UnidadMedidaCreate>;
