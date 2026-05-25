import { useOrders } from "../../orders/hooks/useOrders";
import { useProducts } from "../../products/hooks/useProduct";
import { useUsers } from "../../users/hooks/useUsers";
import type { EstadoPedidoCodigo } from "../../orders/types/Order";
import { ESTADO_LABELS, ESTADO_COLORS } from "../../orders/types/Order";

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

// ─── Dashboard ───────────────────────────────────────────────
const ACTIVE_STATES: EstadoPedidoCodigo[] = [
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREP",
  "EN_CAMINO",
];

export const DashboardPage = () => {
  const { data: orders = [], isLoading: loadingOrders } = useOrders();
  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { users, isLoading: loadingUsers } = useUsers();

  const activeOrders = orders.filter((o) =>
    ACTIVE_STATES.includes(o.estado_codigo as EstadoPedidoCodigo)
  );
  const lowStock = products.filter(
    (p) => p.stock_cantidad > 0 && p.stock_cantidad <= 5
  );
  const unavailable = products.filter((p) => !p.disponible);

  const ordersByStatus = ACTIVE_STATES.map((status) => ({
    status,
    count: orders.filter((o) => o.estado_codigo === status).length,
  }));

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 6);

  return (
    <section className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary font-store">
          Dashboard
        </h1>
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

      {/* Second row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Pedidos por estado */}
        <div className="rounded-xl bg-surface-container-low border border-outline-variant p-5 shadow-warm">
          <h2 className="text-base font-bold text-on-surface font-admin mb-4">
            Pedidos por estado
          </h2>
          {loadingOrders ? (
            <p className="text-sm text-on-surface-variant">Cargando...</p>
          ) : (
            <div className="space-y-3">
              {ordersByStatus.map(({ status, count }) => (
                <div key={status} className="flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${ESTADO_COLORS[status]}`}
                  >
                    {ESTADO_LABELS[status]}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{
                          width: `${
                            orders.length > 0
                              ? (count / orders.length) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="font-bold text-on-surface w-4 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Últimos pedidos */}
        <div className="rounded-xl bg-surface-container-low border border-outline-variant p-5 shadow-warm">
          <h2 className="text-base font-bold text-on-surface font-admin mb-4">
            Últimos pedidos
          </h2>
          {loadingOrders ? (
            <p className="text-sm text-on-surface-variant">Cargando...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-sm text-on-surface-variant">Sin pedidos aún</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between text-sm border-b border-outline-variant/30 pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <span className="font-semibold text-on-surface">
                      #{order.id}
                    </span>
                    <span className="text-on-surface-variant text-xs ml-2">
                      {order.forma_pago_codigo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        ESTADO_COLORS[order.estado_codigo as EstadoPedidoCodigo]
                      }`}
                    >
                      {ESTADO_LABELS[order.estado_codigo as EstadoPedidoCodigo]}
                    </span>
                    <span className="font-bold text-on-surface">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Productos sin stock o deshabilitados */}
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
                      <span className="text-yellow-700 font-bold">
                        ({p.stock_cantidad})
                      </span>
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