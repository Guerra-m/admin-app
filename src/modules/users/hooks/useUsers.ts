import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdminUsers,
  getRoles,
  assignRole,
  revokeRole,
  deleteUser,
} from "../../../shared/api/userManagement.api";

import type {
  UsuarioReadWithRoles,
  RolRead,
} from "../types/UserManagement";

export const USERS_QUERY_KEY = ["admin-users"] as const;

export const ROLES_QUERY_KEY = ["roles"] as const;

export const useUsers = () => {
  const queryClient = useQueryClient();

  // ─────────────────────────────
  // USERS
  // ─────────────────────────────
  const usersQuery = useQuery<UsuarioReadWithRoles[]>({
    queryKey: USERS_QUERY_KEY,

    queryFn: () =>
      getAdminUsers({
        offset: 0,
        limit: 100,
      }),
  });

  // ─────────────────────────────
  // ROLES
  // ─────────────────────────────
  const rolesQuery = useQuery<RolRead[]>({
    queryKey: ROLES_QUERY_KEY,

    queryFn: getRoles,
  });

  // ─────────────────────────────
  // ASSIGN ROLE
  // ─────────────────────────────
  const assignRoleMutation = useMutation({
    mutationFn: ({
      usuario_id,
      rol_codigo,
    }: {
      usuario_id: number;
      rol_codigo: string;
    }) =>
      assignRole({
        usuario_id,
        rol_codigo,
      }),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEY,
      });
    },
  });

  // ─────────────────────────────
  // REVOKE ROLE
  // ─────────────────────────────
  const revokeRoleMutation = useMutation({
    mutationFn: ({
      usuario_id,
      rol_codigo,
    }: {
      usuario_id: number;
      rol_codigo: string;
    }) =>
      revokeRole(usuario_id, rol_codigo),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEY,
      });
    },
  });

  // ─────────────────────────────
  // DELETE USER
  // ─────────────────────────────
  const deleteUserMutation = useMutation({
    mutationFn: (usuarioId: number) =>
      deleteUser(usuarioId),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEY,
      });
    },
  });

  return {
    users: usersQuery.data ?? [],
    roles: rolesQuery.data ?? [],

    isLoading:
      usersQuery.isLoading ||
      rolesQuery.isLoading,

    isError:
      usersQuery.isError ||
      rolesQuery.isError,

    error:
      usersQuery.error ||
      rolesQuery.error,

    assignRoleMutation,
    revokeRoleMutation,
    deleteUserMutation,
  };
};