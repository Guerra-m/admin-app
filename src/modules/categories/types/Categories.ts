export interface CategoriaCreate {
  nombre: string;
  descripcion?: string | null;
  imagen_url?: string | null;
  parent_id?: number | null;
}

export interface CategoriaUpdate {
  nombre?: string | null;
  descripcion?: string | null;
  imagen_url?: string | null;
  parent_id?: number | null;
}

export interface CategoriaRead {
  id: number;

  nombre: string;
  descripcion?: string | null;
  imagen_url?: string | null;

  parent_id?: number | null;

  created_at: string;
  updated_at: string;
}

export interface CategoriaReadSimple {
  id: number;
  nombre: string;
}