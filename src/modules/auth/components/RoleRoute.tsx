import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import type { UserRole } from "../types/UserRole";

interface Props {
  children: ReactNode;
  roles: UserRole[];
}

export const RoleRoute = ({ children, roles }: Props) => {
  const user = useAuthStore((state) => state.user);

  // todavía cargando o sin user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRoles = user.roles ?? [];

  const hasRole = roles.some((role) =>
    userRoles.includes(role)
  );


  if (!hasRole) {
    return (
      <div className="p-6 text-error font-semibold">
        No tienes permisos para acceder a esta sección
      </div>
    );
  }

  return <>{children}</>;
};