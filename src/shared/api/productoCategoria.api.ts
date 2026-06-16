import { http } from "../api/http";

const BASE = "/api/v1/producto-categorias";

export const addProductToCategory = async (data: {
  producto_id: number;
  categoria_id: number;
  es_principal?: boolean;
}) => {
  const res = await http.post(`${BASE}/`, data);
  return res.data;
};

export const removeProductFromCategory = async (data: {
  producto_id: number;
  categoria_id: number;
}) => {
  const res = await http.delete(`${BASE}/${data.producto_id}/${data.categoria_id}`);
  return res.data;
};

export const getCategoriesByProduct = async (producto_id: number) => {
  const res = await http.get(`${BASE}/producto/${producto_id}`);
  return res.data;
};

export const getProductsByCategory = async (categoria_id: number) => {
  const res = await http.get(`${BASE}/categoria/${categoria_id}`);
  return res.data;
};
