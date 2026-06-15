import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const TEST_USERS = [
  { role: "ADMIN", email: "admin@example.com", password: "Admin1234!" },
  { role: "STOCK", email: "stock@example.com", password: "Stock1234!" },
  { role: "PEDIDOS", email: "pedidos@example.com", password: "Pedidos1234!" },
  { role: "CLIENT", email: "juan@example.com", password: "Juan1234!" },
];

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fillUser = (u: typeof TEST_USERS[0]) => {
    setEmail(u.email);
    setPassword(u.password);
    setError(null);
  };

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

        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <p className="text-gray-500 text-sm mt-4 text-center">
          Usuarios de prueba:
        </p>

        <div className="mt-2 space-y-2">
          {TEST_USERS.map((u) => (
            <button
              key={u.role}
              onClick={() => fillUser(u)}
              className="w-full text-left text-xs px-3 py-2 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <span className="font-semibold text-blue-600">{u.role}</span>
              <span className="text-gray-500 ml-2">{u.email}</span>
            </button>
          ))}
        </div>

       </div>
    </div>
  );
};