import { http } from "../api/http";

import type { ProductoRead } from "../../modules/products/types/ProductoRead";
import type { ProductoCreate } from "../../modules/products/types/ProductoCreate";
import type { ProductoUpdate } from "../../modules/products/types/ProductoUpdate";

export const getProducts = async (params?: {
  min_precio?: number;
  max_precio?: number;
  limit?: number;
  offset?: number;
}): Promise<ProductoRead[]> => {
  const res = await http.get("/productos/", { params });
  return res.data;
};

export const getProductById = async (id: number): Promise<ProductoRead> => {
  const res = await http.get(`/productos/${id}`);
  return res.data;
};

export const createProduct = async (
  data: ProductoCreate
): Promise<ProductoRead> => {
  const res = await http.post("/productos/", data);
  return res.data;
};

export const updateProduct = async (
  id: number,
  data: ProductoUpdate
): Promise<ProductoRead> => {
  const res = await http.put(`/productos/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await http.delete(`/productos/${id}`);
};
