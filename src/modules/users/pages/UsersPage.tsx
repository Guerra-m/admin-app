import { useMemo, useState } from "react";

import { UsersTable } from "../components/UsersTable";
import { UserRolesModal } from "../components/UserRolesModal";

import { useUsers } from "../hooks/useUsers";
import { getApiErrorMessage } from "../../../shared/lib/apiError";

import type { UsuarioReadWithRoles } from "../types/UserManagement";
import { RegisterForm } from "../../auth/components/RegisterForm";

export const UsersPage = () => {
  const {
    users,
    roles,
    isLoading,
    isError,
    error,
    assignRoleMutation,
    revokeRoleMutation,
    deleteUserMutation
  } = useUsers();

  const [search, setSearch] = useState("");

  // ─────────────────────────────
  // MODAL ROLES
  // ─────────────────────────────
  const [selectedUser, setSelectedUser] =
    useState<UsuarioReadWithRoles | null>(null);

  const [selectedRoles, setSelectedRoles] =
    useState<string[]>([]);

  const [rolesModalOpen, setRolesModalOpen] =
    useState(false);

  // ─────────────────────────────
  // MODAL CREAR USUARIO
  // ─────────────────────────────
  const [registerOpen, setRegisterOpen] =
    useState(false);

  // ─────────────────────────────
  // FILTER
  // ─────────────────────────────
  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return users;

    return users.filter((user) =>
      user.email.toLowerCase().includes(value)
    );
  }, [users, search]);

  // ─────────────────────────────
  // OPEN ROLES MODAL
  // ─────────────────────────────
  const handleOpenRoles = (user: UsuarioReadWithRoles) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles);
    setRolesModalOpen(true);
  };

  // ─────────────────────────────
  // TOGGLE ROLE
  // ─────────────────────────────
  const handleToggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  // ─────────────────────────────
  // SAVE ROLES
  // ─────────────────────────────
  const handleSaveRoles = async () => {
    if (!selectedUser) return;

    const currentRoles = selectedUser.roles;

    const toAdd = selectedRoles.filter(
      (r) => !currentRoles.includes(r)
    );

    const toRemove = currentRoles.filter(
      (r) => !selectedRoles.includes(r)
    );

    try {
      await Promise.all([
        ...toAdd.map((role) =>
          assignRoleMutation.mutateAsync({
            usuario_id: selectedUser.id,
            rol_codigo: role,
          })
        ),

        ...toRemove.map((role) =>
          revokeRoleMutation.mutateAsync({
            usuario_id: selectedUser.id,
            rol_codigo: role,
          })
        ),
      ]);

      setRolesModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  // ─────────────────────────────
  // DELETE USER
  // ─────────────────────────────
const handleDeleteUser = async (
  user: UsuarioReadWithRoles
) => {
  const confirmed = window.confirm(
    `¿Eliminar a ${user.nombre} ${user.apellido}?`
  );

  if (!confirmed) return;

  try {
    await deleteUserMutation.mutateAsync(user.id);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <section className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary font-store">
            Usuarios
          </h1>

          <p className="mt-1 text-sm text-on-surface-variant font-admin">
            Gestión de usuarios y roles
          </p>
        </div>

        <button
          onClick={() => setRegisterOpen(true)}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:opacity-90"
        >
          Nuevo usuario
        </button>
      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por email..."
        className="w-full rounded-lg border px-4 py-3"
      />

      {/* LOADING */}
      {isLoading && <p>Cargando...</p>}

      {/* ERROR */}
      {isError && (
        <p className="text-error">
          {getApiErrorMessage(error)}
        </p>
      )}

      {/* TABLE */}
      {!isLoading && !isError && (
        <UsersTable
          users={filteredUsers}
          roles={roles}
          onOpenRoles={handleOpenRoles}
          onDeleteUser={handleDeleteUser}
        />
      )}

      {/* MODAL ROLES */}
      <UserRolesModal
        open={rolesModalOpen}
        user={selectedUser}
        roles={roles}
        selectedRoles={selectedRoles}
        onToggleRole={handleToggleRole}
        onClose={() => setRolesModalOpen(false)}
        onSave={handleSaveRoles}
      />

      {/* MODAL CREAR USUARIO */}
      {registerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-outline-variant bg-surface shadow-2xl">

            <div className="flex items-center justify-between border-b border-outline-variant p-6">
              <div>
                <h2 className="text-xl font-bold text-on-surface">
                  Crear usuario
                </h2>

                <p className="text-sm text-on-surface-variant">
                  Alta de usuarios del sistema
                </p>
              </div>

              <button
                onClick={() => setRegisterOpen(false)}
                className="rounded-full p-2 transition hover:bg-surface-container"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <RegisterForm
                onSuccess={() => {
                  setRegisterOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};