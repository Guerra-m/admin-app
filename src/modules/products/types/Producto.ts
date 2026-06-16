import type { CategoriaRead } from "../../categories/types/Categories";
import type { IngredienteRead } from "../../ingredients/types/Ingredients";

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Ingrediente {
  id: number;
  nombre: string;
}

export interface ProductoCreate {
  nombre: string;
  descripcion?: string;
  precio_base: number;
  imagenes_url?: string[];
  stock_cantidad?: number;
  disponible?: boolean;
  unidad_venta_id?: number | null;
  categorias_ids: number[];
  ingredientes_ids: number[];
}

export interface ProductoRead {
  id: number;
  nombre: string;
  descripcion?: string;
  precio_base: number;
  imagenes_url: string[] | null;
  stock_cantidad: number;
  disponible: boolean;
  unidad_venta_id?: number | null;
  categorias: CategoriaRead[];
  ingredientes: IngredienteRead[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface ProductoUpdate {
  nombre?: string;
  descripcion?: string;
  precio_base?: number;
  imagenes_url?: string[];
  stock_cantidad?: number;
  disponible?: boolean;
  unidad_venta_id?: number | null;
  categorias_ids?: number[];
  ingredientes_ids?: number[];
}

export type IngredienteEntry = {
  ingrediente_id: number;
  cantidad: number;
  unidad_medida_id: number;
  es_removible: boolean;
};
