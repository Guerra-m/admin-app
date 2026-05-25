import { useEffect, useState } from "react";
import { userApi } from "../../../shared/api/user.api";
import type { UsuarioReadWithRoles } from "../../auth/types/User";

export const ProfilePage = () => {
  const [user, setUser] = useState<UsuarioReadWithRoles | null>(null);
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

  if (loading) return <div>Cargando perfil...</div>;
  if (!user) return <div>No autenticado</div>;

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-bold">Mi perfil</h1>

      <div><b>Nombre:</b> {user.nombre} {user.apellido}</div>
      <div><b>Email:</b> {user.email}</div>
      <div><b>Celular:</b> {user.celular ?? "-"}</div>
      <div><b>Roles:</b> {user.roles.join(", ")}</div>
    </div>
  );
};