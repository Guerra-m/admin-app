import { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { useOrders } from "../../orders/hooks/useOrders";
import { useProducts } from "../../products/hooks/useProduct";
import { useUsers } from "../../users/hooks/useUsers";
import type { EstadoPedidoCodigo } from "../../orders/types/Order";
import { ESTADO_LABELS } from "../../orders/types/Order";

// ─── Stat Card ────────────────────────────────────────────────
const StatCard = ({
  label,
  value,
  icon,
  colorClass,
}: {
  label: string;
  value: number | string;
  icon: string;
  colorClass: string;
}) => (
  <div className="rounded-xl bg-surface-container-low border border-outline-variant p-5 shadow-warm flex items-center gap-4">
    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${colorClass}`}>
      <span className="material-symbols-outlined text-[24px]">{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-on-surface font-store">{value}</p>
      <p className="text-sm text-on-surface-variant font-admin">{label}</p>
    </div>
  </div>
);

// ─── Constants ────────────────────────────────────────────────
const ACTIVE_STATES: EstadoPedidoCodigo[] = ["PENDIENTE", "CONFIRMADO", "EN_PREP", "EN_CAMINO"];
const ALL_STATES: EstadoPedidoCodigo[] = [
  "PENDIENTE", "CONFIRMADO", "EN_PREP", "EN_CAMINO", "ENTREGADO", "CANCELADO",
];
const PIE_COLORS = ["#6366f1", "#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444"];

// ─── Dashboard ───────────────────────────────────────────────
export const DashboardPage = () => {
  const { data: orders = [], isLoading: loadingOrders } = useOrders();
  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { users, isLoading: loadingUsers } = useUsers();

  const activeOrders = orders.filter((o) =>
    ACTIVE_STATES.includes(o.estado_codigo as EstadoPedidoCodigo)
  );
  const lowStock = products.filter((p) => p.stock_cantidad > 0 && p.stock_cantidad <= 5);
  const unavailable = products.filter((p) => !p.disponible);

  // Chart 1 — ventas por período
  const ventasPorDia = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((o) => {
      const day = o.created_at.slice(0, 10);
      map[day] = (map[day] ?? 0) + o.total;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-14)
      .map(([fecha, total]) => ({ fecha: fecha.slice(5), total: +total.toFixed(2) }));
  }, [orders]);

  // Chart 2 — top productos por precio
  const topProductos = useMemo(() =>
    [...products]
      .sort((a, b) => b.precio_base - a.precio_base)
      .slice(0, 5)
      .map((p) => ({
        nombre: p.nombre.length > 14 ? p.nombre.slice(0, 14) + "…" : p.nombre,
        precio: p.precio_base,
      })),
  [products]);

  // Chart 3 — distribución por estado
  const pedidosPorEstado = useMemo(() =>
    ALL_STATES
      .map((estado) => ({
        name: ESTADO_LABELS[estado],
        value: orders.filter((o) => o.estado_codigo === estado).length,
      }))
      .filter((e) => e.value > 0),
  [orders]);

  // Chart 4 — ingresos por forma de pago
  const ingresosPorFormaPago = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((o) => {
      map[o.forma_pago_codigo] = (map[o.forma_pago_codigo] ?? 0) + o.total;
    });
    return Object.entries(map).map(([name, total]) => ({ name, total: +total.toFixed(2) }));
  }, [orders]);

  return (
    <section className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary font-store">Dashboard</h1>
        <p className="text-sm text-on-surface-variant font-admin mt-1">
          Resumen general del sistema
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Pedidos activos"
          value={loadingOrders ? "..." : activeOrders.length}
          icon="receipt_long"
          colorClass="bg-primary/10 text-primary"
        />
        <StatCard
          label="Productos"
          value={loadingProducts ? "..." : products.length}
          icon="inventory_2"
          colorClass="bg-tertiary/10 text-tertiary"
        />
        <StatCard
          label="Stock bajo (≤5)"
          value={loadingProducts ? "..." : lowStock.length}
          icon="warning"
          colorClass="bg-yellow-100 text-yellow-700"
        />
        <StatCard
          label="Usuarios"
          value={loadingUsers ? "..." : users.length}
          icon="group"
          colorClass="bg-blue-100 text-blue-700"
        />
      </div>

      {/* Charts 2x2 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* LineChart — ventas por período */}
        <div className="rounded-xl bg-surface-container-low border border-outline-variant p-5 shadow-warm">
          <h2 className="text-base font-bold text-on-surface font-admin mb-4">
            Ventas por período
          </h2>
          {loadingOrders ? (
            <p className="text-sm text-on-surface-variant">Cargando...</p>
          ) : ventasPorDia.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Sin datos</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={ventasPorDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`$${v}`, "Total"]} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* BarChart — top productos */}
        <div className="rounded-xl bg-surface-container-low border border-outline-variant p-5 shadow-warm">
          <h2 className="text-base font-bold text-on-surface font-admin mb-4">
            Top productos
          </h2>
          {loadingProducts ? (
            <p className="text-sm text-on-surface-variant">Cargando...</p>
          ) : topProductos.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Sin productos</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProductos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`$${v}`, "Precio"]} />
                <Bar dataKey="precio" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* PieChart — distribución por estado */}
        <div className="rounded-xl bg-surface-container-low border border-outline-variant p-5 shadow-warm">
          <h2 className="text-base font-bold text-on-surface font-admin mb-4">
            Distribución por estado
          </h2>
          {loadingOrders ? (
            <p className="text-sm text-on-surface-variant">Cargando...</p>
          ) : pedidosPorEstado.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Sin pedidos</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pedidosPorEstado}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                >
                  {pedidosPorEstado.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* BarChart horizontal — ingresos por forma de pago */}
        <div className="rounded-xl bg-surface-container-low border border-outline-variant p-5 shadow-warm">
          <h2 className="text-base font-bold text-on-surface font-admin mb-4">
            Ingresos por forma de pago
          </h2>
          {loadingOrders ? (
            <p className="text-sm text-on-surface-variant">Cargando...</p>
          ) : ingresosPorFormaPago.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Sin datos</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ingresosPorFormaPago} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={90} />
                <Tooltip formatter={(v) => [`$${v}`, "Total"]} />
                <Bar dataKey="total" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

      {/* Alertas de inventario */}
      {!loadingProducts && (unavailable.length > 0 || lowStock.length > 0) && (
        <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-5">
          <h2 className="text-base font-bold text-yellow-800 font-admin mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            Alertas de inventario
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {unavailable.length > 0 && (
              <div>
                <p className="font-semibold text-error mb-1">
                  Deshabilitados ({unavailable.length})
                </p>
                <ul className="text-on-surface-variant space-y-0.5">
                  {unavailable.slice(0, 4).map((p) => (
                    <li key={p.id}>• {p.nombre}</li>
                  ))}
                  {unavailable.length > 4 && (
                    <li className="text-xs">...y {unavailable.length - 4} más</li>
                  )}
                </ul>
              </div>
            )}
            {lowStock.length > 0 && (
              <div>
                <p className="font-semibold text-yellow-700 mb-1">
                  Stock bajo ({lowStock.length})
                </p>
                <ul className="text-on-surface-variant space-y-0.5">
                  {lowStock.slice(0, 4).map((p) => (
                    <li key={p.id}>
                      • {p.nombre}{" "}
                      <span className="text-yellow-700 font-bold">({p.stock_cantidad})</span>
                    </li>
                  ))}
                  {lowStock.length > 4 && (
                    <li className="text-xs">...y {lowStock.length - 4} más</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
