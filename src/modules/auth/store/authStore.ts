import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";
import { userApi } from "../../../shared/api/user.api";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setAuth: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setError: (msg: string | null) => void;

  clear: () => void;
  logout: () => Promise<void>;
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

      // 🔥 Limpieza total del estado
      clear: () => {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        });

        localStorage.removeItem("auth-storage");
      },

      // 🚪 LOGOUT REAL (backend + frontend)
      logout: async () => {
        try {
          await userApi.logout(); // llama backend para borrar cookie
        } catch (err) {
          console.warn("Logout backend falló, limpiando igual");
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });

          localStorage.removeItem("auth-storage");
        }
      },
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