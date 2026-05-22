import { http } from "../api/http";

import type {
  CategoriaCreate,
  CategoriaUpdate,
  CategoriaRead,
  CategoriaReadSimple,
} from "../../modules/categories/types/Categories";

/* ─────────────────────────────────────────────────────────────
   GET /categorias
───────────────────────────────────────────────────────────── */
export const getCategories = async (params?: {
  limit?: number;
  offset?: number;
}): Promise<CategoriaRead[]> => {
  const res = await http.get("/categorias/", { params });
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   GET /categorias/raices
───────────────────────────────────────────────────────────── */
export const getRootCategories = async (): Promise<
  CategoriaRead[]
> => {
  const res = await http.get("/categorias/raices");
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   GET /categorias/{id}
───────────────────────────────────────────────────────────── */
export const getCategoryById = async (
  id: number
): Promise<CategoriaRead> => {
  const res = await http.get(`/categorias/${id}`);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   POST /categorias
───────────────────────────────────────────────────────────── */
export const createCategory = async (
  data: CategoriaCreate
): Promise<CategoriaRead> => {
  const res = await http.post("/categorias/", data);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   PUT /categorias/{id}
───────────────────────────────────────────────────────────── */
export const updateCategory = async (
  id: number,
  data: CategoriaUpdate
): Promise<CategoriaRead> => {
  const res = await http.put(`/categorias/${id}`, data);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   DELETE /categorias/{id}
───────────────────────────────────────────────────────────── */
export const deleteCategory = async (id: number): Promise<void> => {
  await http.delete(`/categorias/${id}`);
};