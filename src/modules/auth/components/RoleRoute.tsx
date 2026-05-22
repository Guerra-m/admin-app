import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import type { UserRole } from "../types/UserRole";

interface Props {
  children: ReactNode;
  roles: UserRole[]
}

export const RoleRoute = ({ children, roles }: Props) => {

  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRole = roles.some((role) =>
    user.roles.includes(role)
  );

  if (!hasRole) {
  return <Navigate to="/login" replace />;
}

  return children;
};