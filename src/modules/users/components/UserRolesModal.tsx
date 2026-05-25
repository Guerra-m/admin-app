import { Modal } from "../../../shared/components/Modal";

import { Button } from "../../../shared/components/Button";

import type {
  UsuarioReadWithRoles,
  RolRead,
} from "../types/UserManagement";

type Props = {
  open: boolean;

  user: UsuarioReadWithRoles | null;

  roles: RolRead[];

  selectedRoles: string[];

  onToggleRole: (
    roleCode: string,
  ) => void;

  onClose: () => void;

  onSave: () => void;

  isSaving?: boolean;
};

export const UserRolesModal = ({
  open,
  user,
  roles,
  selectedRoles,
  onToggleRole,
  onClose,
  onSave,
  isSaving = false,
}: Props) => {
  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Editar roles"
    >
      <div className="space-y-6">

        {/* USER */}
        <div>
          <h3
            className="
              text-lg
              font-bold
              text-on-surface
            "
          >
            {user.nombre} {user.apellido}
          </h3>

          <p
            className="
              text-sm
              text-on-surface-variant
            "
          >
            {user.email}
          </p>
        </div>

        {/* ROLES */}
        <div className="space-y-3">

          {roles.map((role) => {
            const checked =
              selectedRoles.includes(
                role.codigo,
              );

            return (
              <label
                key={role.codigo}
                className="
                  flex
                  items-center
                  gap-3

                  rounded-lg
                  border
                  border-outline-variant

                  bg-surface-container-low

                  px-4
                  py-3

                  cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    onToggleRole(
                      role.codigo,
                    )
                  }
                  className="
                    h-4
                    w-4
                  "
                />

                <div>
                  <div
                    className="
                      font-semibold
                      text-on-surface
                    "
                  >
                    {role.codigo}
                  </div>

                  <div
                    className="
                      text-xs
                      text-on-surface-variant
                    "
                  >
                    {role.descripcion ||
                      "Sin descripción"}
                  </div>
                </div>

              </label>
            );
          })}

        </div>

        {/* ACTIONS */}
        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            onClick={onSave}
            disabled={isSaving}
          >
            Guardar
          </Button>
        </div>

      </div>
    </Modal>
  );
};