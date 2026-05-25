import { http } from "../api/http";

import type {
  IngredienteRead,
  IngredienteCreate,
  IngredienteUpdate
} from "../../modules/ingredients/types/Ingredients";

const BASE = "/api/v1/ingredientes";

/* ─────────────────────────────────────────────────────────────
   POST /api/v1/ingredientes
───────────────────────────────────────────────────────────── */
export const createIngredient = async (
  data: IngredienteCreate
): Promise<IngredienteRead> => {
  const res = await http.post(`${BASE}/`, data);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   GET /api/v1/ingredientes
───────────────────────────────────────────────────────────── */
export const getIngredients = async (): Promise<IngredienteRead[]> => {
  const res = await http.get(`${BASE}/`);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   GET /api/v1/ingredientes/{id}
───────────────────────────────────────────────────────────── */
export const getIngredientById = async (
  id: number
): Promise<IngredienteRead> => {
  const res = await http.get(`${BASE}/${id}`);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   PUT /api/v1/ingredientes/{id}
───────────────────────────────────────────────────────────── */
export const updateIngredient = async (
  id: number,
  data: IngredienteUpdate
): Promise<IngredienteRead> => {
  const res = await http.put(`${BASE}/${id}`, data);
  return res.data;
};

/* ─────────────────────────────────────────────────────────────
   DELETE /api/v1/ingredientes/{id}
───────────────────────────────────────────────────────────── */
export const deleteIngredient = async (id: number): Promise<void> => {
  await http.delete(`${BASE}/${id}`);
};