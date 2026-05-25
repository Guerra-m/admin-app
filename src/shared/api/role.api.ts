import { http } from "./http";

import type {
  RoleRead,
} from "../../modules/users/types/User";

/**
 * GET
 * /api/v1/roles/
 */
export const getRoles = async (): Promise<RoleRead[]> => {
  const res = await http.get(
    "/api/v1/roles/"
  );

  return res.data;
};