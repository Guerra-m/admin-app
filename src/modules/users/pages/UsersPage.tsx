import { useMemo, useState } from "react";

import { UsersTable } from "../components/UsersTable";

import { useUsers } from "../hooks/useUsers";

import { getApiErrorMessage } from "../../../shared/lib/apiError";

export const UsersPage = () => {
  const {
    users,
    roles,

    isLoading,
    isError,
    error,

    assignRoleMutation,
    revokeRoleMutation,
  } = useUsers();

  const [search, setSearch] =
    useState("");

  // ─────────────────────────────
  // FILTER USERS
  // ─────────────────────────────
  const filteredUsers = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) return users;

    return users.filter((user) =>
      user.email
        .toLowerCase()
        .includes(value),
    );
  }, [users, search]);

  // ─────────────────────────────
  // ACTIONS
  // ─────────────────────────────
  const handleAssignRole = (
    usuarioId: number,
    rolCodigo: string,
  ) => {
    assignRoleMutation.mutate({
      usuario_id: usuarioId,
      rol_codigo: rolCodigo,
    });
  };

  const handleRevokeRole = (
    usuarioId: number,
    rolCodigo: string,
  ) => {
    revokeRoleMutation.mutate({
      usuario_id: usuarioId,
      rol_codigo: rolCodigo,
    });
  };

  return (
    <section className="space-y-stack-lg">

      {/* HEADER */}
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-primary
            font-store
          "
        >
          Usuarios
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-on-surface-variant
            font-admin
          "
        >
          Gestión de usuarios y roles
        </p>
      </div>

      {/* SEARCH */}
      <div>
        <input
          type="text"
          placeholder="Buscar por email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-lg
            border
            border-outline-variant
            bg-surface-container-lowest
            px-4
            py-3
            text-on-surface
            outline-none
            transition-all

            focus:border-primary
          "
        />
      </div>

      {/* LOADING */}
      {isLoading && (
        <div
          className="
            rounded-lg
            bg-surface-container
            p-6
            text-on-surface-variant
            shadow-warm
          "
        >
          Cargando usuarios...
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div
          className="
            rounded-lg
            border
            border-error
            bg-error/10
            p-4
            text-error
          "
        >
          Error:
          {" "}
          {getApiErrorMessage(error)}
        </div>
      )}

      {/* TABLE */}
      {!isLoading && !isError && (
        <UsersTable
          users={filteredUsers}
          roles={roles}
          onAssignRole={
            handleAssignRole
          }
          onRevokeRole={
            handleRevokeRole
          }
        />
      )}

    </section>
  );
};