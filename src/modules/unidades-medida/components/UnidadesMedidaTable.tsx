import { Button } from "../../../shared/components/Button";
import type { UnidadMedidaRead } from "../types/UnidadMedida";

const TIPO_LABEL: Record<string, string> = {
  peso: "Peso",
  volumen: "Volumen",
  contable: "Contable",
};

const TIPO_COLOR: Record<string, string> = {
  peso: "bg-blue-100 text-blue-700",
  volumen: "bg-cyan-100 text-cyan-700",
  contable: "bg-green-100 text-green-700",
};

type Props = {
  unidades: UnidadMedidaRead[];
  onEdit: (u: UnidadMedidaRead) => void;
  onDelete: (id: number) => void;
};

export const UnidadesMedidaTable = ({ unidades, onEdit, onDelete }: Props) => {
  const thCls = "px-6 py-4 text-left text-sm font-bold font-admin text-on-surface";
  const tdCls = "px-6 py-4 text-sm text-on-surface-variant font-admin";

  return (
    <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-surface-container-low shadow-warm">
      <table className="min-w-full">
        <thead className="border-b border-outline-variant bg-surface-container">
          <tr>
            <th className={thCls}>Nombre</th>
            <th className={thCls}>Símbolo</th>
            <th className={thCls}>Tipo</th>
            <th className={thCls}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {unidades.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-10 text-center text-sm text-on-surface-variant">
                No hay unidades de medida registradas
              </td>
            </tr>
          )}
          {unidades.map((u) => (
            <tr key={u.id} className="border-b border-outline-variant/50 hover:bg-surface-container transition-colors">
              <td className={`${tdCls} font-semibold text-on-surface`}>{u.nombre}</td>
              <td className={tdCls}>
                <span className="font-mono bg-surface-container px-2 py-0.5 rounded text-xs">
                  {u.simbolo}
                </span>
              </td>
              <td className={tdCls}>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${TIPO_COLOR[u.tipo] ?? "bg-surface-container text-on-surface"}`}>
                  {TIPO_LABEL[u.tipo] ?? u.tipo}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={() => onEdit(u)}
                    className="border border-outline bg-surface-container text-on-surface hover:bg-surface-container-high"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(u.id)}
                    className="bg-error text-white hover:opacity-90"
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
