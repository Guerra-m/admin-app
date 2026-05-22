import { http } from "../api/http";

import type {
  ProductoRead,
  ProductoCreate,
  ProductoUpdate,
} from "../../modules/products/types/Producto";

/**
 * GET /productos
 */
export const getProducts = async (params?: {
  limit?: number;
  offset?: number;
}): Promise<ProductoRead[]> => {
  const res = await http.get("/productos/", { params });
  return res.data;
};

/**
 * GET /productos/disponibles
 */
export const getAvailableProducts = async (params?: {
  limit?: number;
  offset?: number;
}): Promise<ProductoRead[]> => {
  const res = await http.get("/productos/disponibles", { params });
  return res.data;
};

/**
 * GET /productos/{id}
 */
export const getProductById = async (
  id: number
): Promise<ProductoRead> => {
  const res = await http.get(`/productos/${id}`);
  return res.data;
};

/**
 * POST /productos
 */
export const createProduct = async (
  data: ProductoCreate
): Promise<ProductoRead> => {
  const res = await http.post("/productos/", data);
  return res.data;
};

/**
 * PUT /productos/{id}
 */
export const updateProduct = async (
  id: number,
  data: ProductoUpdate
): Promise<ProductoRead> => {
  const res = await http.put(`/productos/${id}`, data);
  return res.data;
};

/**
 * DELETE /productos/{id}
 */
export const deleteProduct = async (id: number): Promise<void> => {
  await http.delete(`/productos/${id}`);
};

/* ─────────────────────────────────────────────────────────────
   RELACIONES: CATEGORÍAS
───────────────────────────────────────────────────────────── */

/**
 * POST /productos/{id}/categorias/{categoriaId}
 */
export const addProductCategory = async (
  productId: number,
  categoryId: number,
  esPrincipal: boolean = false
): Promise<void> => {
  await http.post(
    `/productos/${productId}/categorias/${categoryId}`,
    null,
    {
      params: {
        es_principal: esPrincipal,
      },
    }
  );
};

/**
 * DELETE /productos/{id}/categorias/{categoriaId}
 */
export const removeProductCategory = async (
  productId: number,
  categoryId: number
): Promise<void> => {
  await http.delete(
    `/productos/${productId}/categorias/${categoryId}`
  );
};

/* ─────────────────────────────────────────────────────────────
   RELACIONES: INGREDIENTES
───────────────────────────────────────────────────────────── */

/**
 * POST /productos/{id}/ingredientes/{ingredienteId}
 */
export const addProductIngredient = async (
  productId: number,
  ingredientId: number,
  esRemovible: boolean = false
): Promise<void> => {
  await http.post(
    `/productos/${productId}/ingredientes/${ingredientId}`,
    null,
    {
      params: {
        es_removible: esRemovible,
      },
    }
  );
};

/**
 * DELETE /productos/{id}/ingredientes/{ingredienteId}
 */
export const removeProductIngredient = async (
  productId: number,
  ingredientId: number
): Promise<void> => {
  await http.delete(
    `/productos/${productId}/ingredientes/${ingredientId}`
  );
};