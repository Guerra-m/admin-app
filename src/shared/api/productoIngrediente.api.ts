import { http } from "../api/http";

const BASE = "/api/v1/producto-ingrediente";

export const addIngredientToProduct = async (data: {
  producto_id: number;
  ingrediente_id: number;
  cantidad: number;
  unidad_medida_id: number;
  es_removible?: boolean;
}) => {
  const res = await http.post(`${BASE}/`, data);
  return res.data;
};

export const removeIngredientFromProduct = async (data: {
  producto_id: number;
  ingrediente_id: number;
}) => {
  const res = await http.delete(`${BASE}/${data.producto_id}/${data.ingrediente_id}`);
  return res.data;
};

export const getIngredientsByProduct = async (producto_id: number) => {
  const res = await http.get(`${BASE}/producto/${producto_id}`);
  return res.data;
};

export const getProductsByIngredient = async (ingrediente_id: number) => {
  const res = await http.get(`${BASE}/ingrediente/${ingrediente_id}`);
  return res.data;
};
