import { create } from "zustand"
import { persist } from "zustand/middleware";
import type { User, LoginCredentials } from "../types"

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;

    login: (credentials: LoginCredentials) => boolean;
    logout: () => void;
}

const hardcodedUser: User = {
    email: "pepe@gmail.com",
    password: "pepePassword23"
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            error: null,

            login: (credentials) => {

                const isValid =
                    credentials.email === hardcodedUser.email &&
                    credentials.password === hardcodedUser.password;

                if (isValid) {

                    set({
                        user: hardcodedUser,
                        isAuthenticated: true,
                        error: null
                    });

                    return true;
                }

                set({
                    error: "Credenciales incorrectas"
                });

                return false;
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null
                });
            }
        }),
        {
            name: "auth-storage"
        }
    )
);