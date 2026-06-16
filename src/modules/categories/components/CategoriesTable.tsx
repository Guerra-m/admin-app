import { useState } from "react";
import { Button } from "../../../shared/components/Button";
import type { CategoriaRead } from "../types/Categories";

type Props = {
  categories: CategoriaRead[];
  onEdit: (category: CategoriaRead) => void;
  onDelete: (id: number) => void;
};

export const CategoriesTable = ({ categories, onEdit, onDelete }: Props) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = (id: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const alpha = (a: CategoriaRead, b: CategoriaRead) =>
    a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" });

  const childrenOf = (parentId: number) =>
    categories.filter((c) => c.parent_id === parentId).sort(alpha);

  const roots = categories.filter((c) => c.parent_id == null).sort(alpha);

  const ActionButtons = ({ category }: { category: CategoriaRead }) => (
    <div className="flex gap-3">
      <Button
        variant="secondary"
        onClick={() => onEdit(category)}
        className="border border-outline bg-surface-container text-on-surface hover:bg-surface-container-high"
      >
        Editar
      </Button>
      <Button
        variant="danger"
        onClick={() => onDelete(category.id)}
        className="bg-error text-white hover:opacity-90"
      >
        Eliminar
      </Button>
    </div>
  );

  const renderRows = (cats: CategoriaRead[], depth: number): React.ReactNode =>
    cats.map((cat) => {
      const children = childrenOf(cat.id);
      const hasChildren = children.length > 0;
      const isExpanded = expanded.has(cat.id);
      const indent = depth * 20;

      return (
        <>
          <tr
            key={cat.id}
            className={`
              border-b border-outline-variant/50 transition-colors duration-200 hover:bg-surface-container
              ${depth > 0 ? "bg-surface-container/30" : ""}
            `}
          >
            {/* NOMBRE */}
            <td className="px-6 py-4 font-admin text-on-surface">
              <div
                className="flex items-center gap-2"
                style={{ paddingLeft: `${indent}px` }}
              >
                {hasChildren ? (
                  <button
                    onClick={() => toggle(cat.id)}
                    className="w-5 h-5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isExpanded ? "expand_more" : "chevron_right"}
                    </span>
                  </button>
                ) : (
                  <span className="w-5 shrink-0" />
                )}

                {depth > 0 && (
                  <span className="text-outline-variant text-xs shrink-0">↳</span>
                )}

                <span className={depth === 0 ? "font-semibold" : "text-sm"}>
                  {cat.nombre}
                </span>

                {hasChildren && (
                  <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-normal shrink-0">
                    {children.length}
                  </span>
                )}
              </div>
            </td>

            {/* DESCRIPCIÓN */}
            <td className="px-6 py-4 text-sm text-on-surface-variant">
              {cat.descripcion || "-"}
            </td>

            {/* ACCIONES */}
            <td className="px-6 py-4">
              <ActionButtons category={cat} />
            </td>
          </tr>

          {isExpanded && renderRows(children, depth + 1)}
        </>
      );
    });

  return (
    <div className="overflow-auto max-h-150 rounded-2xl border border-outline-variant bg-surface-container-low shadow-warm">
      <table className="min-w-full">

        <thead className="border-b border-outline-variant bg-surface-container sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-bold font-admin text-on-surface">
              Nombre
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold font-admin text-on-surface">
              Descripción
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold font-admin text-on-surface">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {roots.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-sm text-on-surface-variant">
                No hay categorías registradas
              </td>
            </tr>
          ) : (
            renderRows(roots, 0)
          )}
        </tbody>

      </table>
    </div>
  );
};
