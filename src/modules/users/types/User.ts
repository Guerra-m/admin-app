export interface UserRead {
  id: number;

  nombre: string;
  apellido: string;

  email: string;
  celular?: string | null;

  roles: string[];

  created_at: string;
  updated_at: string;
}

export interface UserUpdate {
  nombre?: string;
  apellido?: string;
  celular?: string | null;
}

export interface RoleRead {
  id: number;

  codigo: string;
  descripcion?: string | null;
}

export interface UserRoleAssign {
  usuario_id: number;
  rol_codigo: string;
  asignado_por_id?: number;
}