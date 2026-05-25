export * from "./User";
export * from "./UserRole";

export interface User {
  id: number;
  email: string;
  nombre?: string;
  roles: string[];
}

export interface LoginResponse {
  mensaje: string;
  refresh_token: string;
  expires_in: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre?: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}