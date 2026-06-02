import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";

type RegisterFormProps = {
  onSuccess?: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { register } = useAuth();
  const { loading: isLoading, error } = useAuthStore();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    celular: null,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

    setForm({
      nombre: "",
      apellido: "",
      email: "",
      celular: null,
      password: "",
    });

    onSuccess?.();
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full rounded-xl border border-outline-variant px-4 py-3"
          required
        />

        <input
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          className="w-full rounded-xl border border-outline-variant px-4 py-3"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full rounded-xl border border-outline-variant px-4 py-3"
          required
        />


        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full rounded-xl border border-outline-variant px-4 py-3"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Creando usuario..." : "Crear usuario"}
        </button>
      </form>
    </div>
  );
};