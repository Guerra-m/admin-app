export interface UsuarioCreate {
  nombre: string;
  apellido: string;
  email: string;
  celular?: string | null;
  password: string;
}

export interface UsuarioUpdate {
  nombre?: string | null;
  apellido?: string | null;
  celular?: string | null;
}

export interface UsuarioRead {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UsuarioReadWithRoles extends UsuarioRead {
  roles: string[];
}

export interface UsuarioAuth {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular?: string | null;
  roles: string[];
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface TokenRefreshRequest {
  refresh_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  celular?: string | null;
  password: string;
}

export interface LoginResponse {
  mensaje: string;
  refresh_token: string;
  expires_in: number;
}