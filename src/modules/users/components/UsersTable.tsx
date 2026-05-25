import { Button } from "../../../shared/components/Button";

import type {
  UsuarioReadWithRoles,
  RolRead,
} from "../types/UserManagement";

type Props = {
  users: UsuarioReadWithRoles[];
  roles: RolRead[];

  onOpenRoles: (user: UsuarioReadWithRoles) => void;
};

export const UsersTable = ({
  users,
  onOpenRoles,
}: Props) => {
  return (
    <div
      className="
        overflow-x-auto
        rounded-xl
        border
        border-outline-variant
        bg-surface-container-lowest
        shadow-warm
      "
    >
      <table className="min-w-full text-sm font-admin">

        {/* HEADER */}
        <thead
          className="
            bg-surface-container
            text-on-surface
            border-b
            border-outline-variant
          "
        >
          <tr>
            <th className="p-4 text-left font-semibold">Usuario</th>
            <th className="p-4 text-left font-semibold">Email</th>
            <th className="p-4 text-left font-semibold">Roles</th>
            <th className="p-4 text-left font-semibold">Acciones</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`
                border-b border-outline-variant/40
                transition-colors duration-200
                hover:bg-surface-container-low
                ${
                  index % 2 === 0
                    ? "bg-surface-container-lowest"
                    : "bg-surface"
                }
              `}
            >
              {/* USER */}
              <td className="p-4">
                <div className="font-semibold text-on-surface">
                  {user.nombre} {user.apellido}
                </div>
                <div className="text-xs text-on-surface-variant mt-1">
                  ID #{user.id}
                </div>
              </td>

              {/* EMAIL */}
              <td className="p-4 text-on-surface">
                {user.email}
              </td>

              {/* ROLES */}
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {user.roles.length > 0 ? (
                    user.roles.map((role) => (
                      <span
                        key={role}
                        className="
                          inline-flex
                          rounded-full
                          bg-primary/10
                          px-3 py-1
                          text-xs font-semibold
                          text-primary
                        "
                      >
                        {role}
                      </span>
                    ))
                  ) : (
                    <span className="text-on-surface-variant">
                      Sin roles
                    </span>
                  )}
                </div>
              </td>

              {/* ACTIONS */}
              <td className="p-4">
                <Button
                  variant="secondary"
                  onClick={() => onOpenRoles(user)}
                >
                  Roles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};