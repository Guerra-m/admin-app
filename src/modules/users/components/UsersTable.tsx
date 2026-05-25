import { Button } from "../../../shared/components/Button";

import type {
  UsuarioReadWithRoles,
  RolRead,
} from "../types/UserManagement";

type Props = {
  users: UsuarioReadWithRoles[];

  roles: RolRead[];

  onAssignRole: (
    usuarioId: number,
    rolCodigo: string,
  ) => void;

  onRevokeRole: (
    usuarioId: number,
    rolCodigo: string,
  ) => void;
};

export const UsersTable = ({
  users,
  roles,
  onAssignRole,
  onRevokeRole,
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
            border-b
            border-outline-variant
            bg-surface-container
            text-on-surface
          "
        >
          <tr>
            <th className="p-4 text-left font-semibold">
              Usuario
            </th>

            <th className="p-4 text-left font-semibold">
              Email
            </th>

            <th className="p-4 text-left font-semibold">
              Celular
            </th>

            <th className="p-4 text-left font-semibold">
              Roles
            </th>

            <th className="p-4 text-left font-semibold">
              Gestión
            </th>
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

                <div
                  className="
                    mt-1
                    text-xs
                    text-on-surface-variant
                  "
                >
                  ID #{user.id}
                </div>
              </td>

              {/* EMAIL */}
              <td className="p-4 text-on-surface">
                {user.email}
              </td>

              {/* PHONE */}
              <td className="p-4 text-on-surface">
                {user.celular || "-"}
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
                          px-3
                          py-1
                          text-xs
                          font-semibold
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
                <div className="flex flex-wrap gap-2">

                  {roles.map((role) => {
                    const hasRole =
                      user.roles.includes(role.codigo);

                    return hasRole ? (
                      <Button
                        key={role.codigo}
                        variant="danger"
                        onClick={() =>
                          onRevokeRole(
                            user.id,
                            role.codigo,
                          )
                        }
                      >
                        Quitar {role.codigo}
                      </Button>
                    ) : (
                      <Button
                        key={role.codigo}
                        variant="secondary"
                        onClick={() =>
                          onAssignRole(
                            user.id,
                            role.codigo,
                          )
                        }
                      >
                        Dar {role.codigo}
                      </Button>
                    );
                  })}

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};