import { useEffect, useState } from "react";
import { userApi } from "../../../shared/api/user.api";
import type { UsuarioReadWithRoles } from "../../auth/types/User";

export const ProfilePage = () => {
  const [user, setUser] =
    useState<UsuarioReadWithRoles | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await userApi.me();
        setUser(data);
      } catch (err) {
        console.error("Error cargando perfil", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-on-surface-variant">
        Cargando perfil...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-error">
        No autenticado
      </div>
    );
  }

  return (
    <section className="space-y-stack-lg">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-primary font-store">
          Mi perfil
        </h1>

        <p className="text-sm text-on-surface-variant font-admin mt-1">
          Información personal del usuario autenticado
        </p>
      </div>

      {/* CARD */}
      <div
        className="
          rounded-xl
          border
          border-outline-variant
          bg-surface-container-lowest
          shadow-warm
          p-6
          space-y-6
        "
      >

        {/* USER INFO */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-on-surface">
            {user.nombre} {user.apellido}
          </h2>

          <p className="text-sm text-on-surface-variant">
            ID #{user.id}
          </p>
        </div>

        {/* FIELDS */}
        <div className="grid gap-4">

          <div className="flex justify-between border-b border-outline-variant/40 pb-2">
            <span className="text-on-surface-variant">Email</span>
            <span className="text-on-surface font-medium">
              {user.email}
            </span>
          </div>

          <div className="flex justify-between border-b border-outline-variant/40 pb-2">
            <span className="text-on-surface-variant">Celular</span>
            <span className="text-on-surface font-medium">
              {user.celular ?? "-"}
            </span>
          </div>

        </div>

        {/* ROLES */}
        <div>
          <h3 className="text-sm font-semibold text-on-surface mb-2">
            Roles
          </h3>

          <div className="flex flex-wrap gap-2">
            {user.roles.length > 0 ? (
              user.roles.map((role) => (
                <span
                  key={role}
                  className="
                    inline-flex
                    rounded-full
                    bg-primary/10
                    text-primary
                    px-3 py-1
                    text-xs font-semibold
                  "
                >
                  {role}
                </span>
              ))
            ) : (
              <span className="text-on-surface-variant text-sm">
                Sin roles asignados
              </span>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};