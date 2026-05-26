import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const { register, login } = useAuth();
    const { loading: isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        celular: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await register({
            nombre: form.nombre,
            apellido: form.apellido,
            email: form.email,
            celular: form.celular || null,
            password: form.password,
        });

        if (!success) return;

        const logged = await login({
            email: form.email,
            password: form.password,
        });

        if (logged) {
            navigate("/perfil"); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-4">

            <div className="w-full max-w-md bg-surface-container border border-outline-variant rounded-xl shadow-warm p-6">

                {/* Header */}
                <div className="text-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary">
                        person_add
                    </span>

                    <h1 className="text-2xl font-bold text-on-surface font-store mt-2">
                        Crear cuenta
                    </h1>

                    <p className="text-sm text-on-surface-variant font-admin">
                        Registrate para acceder al sistema
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant"
                        required
                    />

                    <input
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        placeholder="Apellido"
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant"
                        required
                    />

                    <input
                        type="text"
                        name="celular"
                        value={form.celular}
                        onChange={handleChange}
                        placeholder="Celular (opcional)"
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant"
                    />

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                        {isLoading ? "Creando cuenta..." : "Registrarse"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-on-surface-variant">
                        ¿Ya tienes cuenta?
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-primary font-semibold hover:underline"
                    >
                        Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    );
};