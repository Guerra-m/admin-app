import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
export const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const success = await login({ email, password });

    setLoading(false);

    if (success) {
      navigate("/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              bg-blue-600 hover:bg-blue-700
              text-white font-semibold py-3 rounded-lg
              transition duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {error}
          </p>

        )}
        <p className="text-gray-500 text-sm mt-4 text-center">
          Usuarios de prueba:
        </p>

        <div className="mt-2 space-y-1 text-xs text-gray-600 text-center">
          <p>
            ADMIN: admin@example.com / Admin1234!
          </p>

          <p>
            STOCK: stock@example.com / Stock1234!
          </p>

          <p>
            PEDIDOS: pedidos@example.com / Pedidos1234!
          </p>

          <p>
            CLIENT: juan@example.com / Juan1234!
          </p>
        </div>

      </div>
    </div>
  );
};