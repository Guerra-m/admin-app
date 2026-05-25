import { userApi } from "../../../shared/api/user.api";
import { useAuthStore } from "../store/authStore";
import type { LoginCredentials, RegisterRequest, UsuarioReadWithRoles } from "../types/User";

export const useAuth = () => {
  const { setUser, setAuth, setLoading, setError,  } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      await userApi.login(credentials.email, credentials.password);

      const user = await userApi.me() as UsuarioReadWithRoles;

      setUser(user);
      setAuth(true);

      return true;
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Error login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      await userApi.register(data);
      return true;
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Error register");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
};

  const getMe = async () => {
    try {
      const user = await userApi.me() as UsuarioReadWithRoles;
      setUser(user);
      setAuth(true);
    } catch {
    }
  };

  return {
    login,
    register,
    logout,
    getMe,
  };
};