import { http } from "./http";

import type {
  UsuarioReadWithRoles,
  RolRead,
  UsuarioRolCreate,
} from "../../modules/users/types/UserManagement";

// ─────────────────────────────
// GET USERS
// ─────────────────────────────
export const getAdminUsers = async (params?: {
  offset?: number;
  limit?: number;
}): Promise<UsuarioReadWithRoles[]> => {
  const res = await http.get(
    "/api/v1/auth/admin/usuarios",
    {
      params,
      withCredentials: true,
    },
  );

  return res.data;
};

// ─────────────────────────────
// GET ROLES
// ─────────────────────────────
export const getRoles = async (): Promise<
  RolRead[]
> => {
  const res = await http.get(
    "/api/v1/roles/",
    {
      withCredentials: true,
    },
  );

  return res.data;
};

// ─────────────────────────────
// ASSIGN ROLE
// ─────────────────────────────
export const assignRole = async (
  data: UsuarioRolCreate,
) => {
  const res = await http.post(
    "/api/v1/admin/roles/asignar",
    data,
    {
      withCredentials: true,
    },
  );

  return res.data;
};

// ─────────────────────────────
// REVOKE ROLE
// ─────────────────────────────
export const revokeRole = async (
  usuarioId: number,
  rolCodigo: string,
) => {
  const res = await http.delete(
    `/api/v1/admin/roles/${usuarioId}/${rolCodigo}`,
    {
      withCredentials: true,
    },
  );

  return res.data;
};