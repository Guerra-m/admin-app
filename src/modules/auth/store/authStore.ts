import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UsuarioReadWithRoles } from "../types/User";

type AuthState = {
  user: UsuarioReadWithRoles | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  setUser: (user: UsuarioReadWithRoles | null) => void;
  setAuth: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setError: (msg: string | null) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      setUser: (user) => set({ user }),
      setAuth: (value) => set({ isAuthenticated: value }),
      setLoading: (value) => set({ loading: value }),
      setError: (msg) => set({ error: msg }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);