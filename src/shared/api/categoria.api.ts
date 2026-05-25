import { http } from "../api/http";

import type {
  CategoriaCreate,
  CategoriaUpdate,
  CategoriaRead,
} from "../../modules/categories/types/Categories";

const BASE = "/api/v1/categorias";

/* ─────────────────────────────────────────────────────────────
   GET /api/v1/categorias
───────────────────────────────────────────────────────────── */
export const getCategories = async (params?: {
  limit?: number;
  offset?: number;
}): Promise<CategoriaRead[]> => {
  const res = await http.get(`${BASE}/`, { params });
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   GET /api/v1/categorias/raices
───────────────────────────────────────────────────────────── */
export const getRootCategories = async (): Promise<CategoriaRead[]> => {
  const res = await http.get(`${BASE}/raices`);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   GET /api/v1/categorias/{id}
───────────────────────────────────────────────────────────── */
export const getCategoryById = async (
  id: number
): Promise<CategoriaRead> => {
  const res = await http.get(`${BASE}/${id}`);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   POST /api/v1/categorias
───────────────────────────────────────────────────────────── */
export const createCategory = async (
  data: CategoriaCreate
): Promise<CategoriaRead> => {
  const res = await http.post(`${BASE}/`, data);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   PUT /api/v1/categorias/{id}
───────────────────────────────────────────────────────────── */
export const updateCategory = async (
  id: number,
  data: CategoriaUpdate
): Promise<CategoriaRead> => {
  const res = await http.put(`${BASE}/${id}`, data);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   DELETE /api/v1/categorias/{id}
───────────────────────────────────────────────────────────── */
export const deleteCategory = async (id: number): Promise<void> => {
  await http.delete(`${BASE}/${id}`);
};