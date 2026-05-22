// Usuario Create
export interface UsuarioCreate {
  nombre: string;
  apellido: string;
  email: string;
  celular?: string | null;
  password: string;
}

// Usuario Update (parcial)
export interface UsuarioUpdate {
  nombre?: string | null;
  apellido?: string | null;
  celular?: string | null;
}

// Usuario Read (respuesta del backend)
export interface UsuarioRead {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular?: string | null;
  created_at: string; // datetime -> string en frontend
  updated_at: string; // datetime -> string en frontend
}

// Usuario con roles
export interface UsuarioReadWithRoles extends UsuarioRead {
  roles: string[];
}

// Usuario autenticado (interno frontend)
export interface UsuarioAuth {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular?: string | null;
  roles: string[];
}

// Token
export interface Token {
  access_token: string;
  token_type: string; // normalmente "bearer"
  expires_in: number;
}

// Refresh token request
export interface TokenRefreshRequest {
  refresh_token: string;
}