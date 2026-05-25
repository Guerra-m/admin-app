export interface UsuarioReadWithRoles {
  id: number;

  nombre: string;
  apellido: string;

  email: string;

  celular?: string | null;

  roles: string[];

  created_at: string;
  updated_at: string;
}

export interface RolRead {
  id: number;

  codigo: string;
  descripcion?: string | null;
}

export interface UsuarioRolCreate {
  usuario_id: number;

  rol_codigo: string;

  asignado_por_id?: number;
}