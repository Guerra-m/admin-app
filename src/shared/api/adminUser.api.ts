import { http } from "./http";

import type {
  UserRead,
  UserUpdate,
} from "../../modules/users/types/User";

/**
 * GET
 * /api/v1/auth/admin/usuarios
 */
export const getUsers = async (): Promise<UserRead[]> => {
  const res = await http.get(
    "/api/v1/auth/admin/usuarios"
  );

  return res.data;
};

/**
 * PUT
 * (Preparado para futuro endpoint)
 */
export const updateUser = async (
  id: number,
  payload: UserUpdate
): Promise<UserRead> => {
  const res = await http.put(
    `/api/v1/users/${id}`,
    payload
  );

  return res.data;
};

/**
 * DELETE
 * (Preparado para futuro endpoint)
 */
export const deleteUser = async (
  id: number
): Promise<void> => {
  await http.delete(`/api/v1/users/${id}`);
};