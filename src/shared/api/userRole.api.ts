import { http } from "./http";

import type {
  UserRoleAssign,
} from "../../modules/users/types/User";

/**
 * POST
 * /api/v1/admin/roles/asignar
 */
export const assignRole = async (
  payload: UserRoleAssign
) => {
  const res = await http.post(
    "/api/v1/admin/roles/asignar",
    payload
  );

  return res.data;
};

/**
 * DELETE
 * /api/v1/admin/roles/{usuario_id}/{rol_codigo}
 */
export const revokeRole = async (
  usuarioId: number,
  rolCodigo: string
) => {
  const res = await http.delete(
    `/api/v1/admin/roles/${usuarioId}/${rolCodigo}`
  );

  return res.data;
};

/**
 * GET
 * /api/v1/admin/roles/usuario/{usuario_id}
 */
export const getUserRoles = async (
  usuarioId: number
): Promise<string[]> => {
  const res = await http.get(
    `/api/v1/admin/roles/usuario/${usuarioId}`
  );

  return res.data;
};