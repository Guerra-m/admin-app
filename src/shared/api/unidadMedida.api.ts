import { http } from "./http";
import type { UnidadMedidaCreate, UnidadMedidaRead, UnidadMedidaUpdate } from "../../modules/unidades-medida/types/UnidadMedida";

const BASE = "/api/v1/unidades-medida";

export const unidadMedidaApi = {
  listar: async (): Promise<UnidadMedidaRead[]> => {
    const res = await http.get(`${BASE}/`, { params: { limit: 100 } });
    return res.data;
  },

  crear: async (data: UnidadMedidaCreate): Promise<UnidadMedidaRead> => {
    const res = await http.post(`${BASE}/`, data);
    return res.data;
  },

  actualizar: async (id: number, data: UnidadMedidaUpdate): Promise<UnidadMedidaRead> => {
    const res = await http.put(`${BASE}/${id}`, data);
    return res.data;
  },

  eliminar: async (id: number): Promise<void> => {
    await http.delete(`${BASE}/${id}`);
  },
};
