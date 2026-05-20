import { Button } from "../../../shared/components/Button";

import type { CategoriaRead } from "../types/CategoriaRead";

type Props = {
  categories: CategoriaRead[];
  onEdit: (category: CategoriaRead) => void;
  onDelete: (id: number) => void;
};

export const CategoriesTable = ({
  categories,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">

        <thead className="bg-blue-400 text-left">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Descripción</th>
            <th className="p-3">Parent ID</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t hover:bg-blue-50"
            >

              <td className="p-3 font-medium">
                {category.nombre}
              </td>

              <td className="p-3">
                {category.descripcion || "-"}
              </td>

              <td className="p-3">
                {category.parent_id ?? "-"}
              </td>

              <td className="p-3">
                <div className="flex gap-2">

                  <Button
                    variant="secondary"
                    onClick={() =>
                      onEdit(category)
                    }
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      onDelete(category.id)
                    }
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