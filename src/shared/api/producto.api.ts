import { http } from "../api/http";

import type {
  ProductoRead,
  ProductoCreate,
  ProductoUpdate,
} from "../../modules/products/types/Producto";

const BASE = "/api/v1/productos";

/* ─────────────────────────────────────────────────────────────
   PRODUCTOS
───────────────────────────────────────────────────────────── */

/**
 * GET /api/v1/productos
 */
export const getProducts = async (params?: {
  limit?: number;
  offset?: number;
}): Promise<ProductoRead[]> => {
  const res = await http.get(`${BASE}/`, { params });
  return res.data;
};

/**
 * GET /api/v1/productos/disponibles
 */
export const getAvailableProducts = async (params?: {
  limit?: number;
  offset?: number;
}): Promise<ProductoRead[]> => {
  const res = await http.get(`${BASE}/disponibles`, { params });
  return res.data;
};

/**
 * GET /api/v1/productos/{id}
 */
export const getProductById = async (
  id: number
): Promise<ProductoRead> => {
  const res = await http.get(`${BASE}/${id}`);
  return res.data;
};

/**
 * POST /api/v1/productos
 */
export const createProduct = async (
  data: ProductoCreate
): Promise<ProductoRead> => {
  const res = await http.post(`${BASE}/`, data);
  return res.data;
};

/**
 * PUT /api/v1/productos/{id}
 */
export const updateProduct = async (
  id: number,
  data: ProductoUpdate
): Promise<ProductoRead> => {
  const res = await http.put(`${BASE}/${id}`, data);
  return res.data;
};

/**
 * PATCH /api/v1/productos/{id}/imagenes
 */
export const updateProductImages = async (
  id: number,
  imagenes_url: string[]
): Promise<ProductoRead> => {
  const res = await http.patch(`${BASE}/${id}/imagenes`, { imagenes_url });
  return res.data;
};

/**
 * DELETE /api/v1/productos/{id}
 */
export const deleteProduct = async (id: number): Promise<void> => {
  await http.delete(`${BASE}/${id}`);
};