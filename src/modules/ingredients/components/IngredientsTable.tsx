import { Button } from "../../../shared/components/Button";

import type { IngredienteRead } from "../types/IngredienteRead";

type Props = {
  ingredients: IngredienteRead[];
  onEdit: (ingredient: IngredienteRead) => void;
  onDelete: (id: number) => void;
};

export const IngredientsTable = ({
  ingredients,
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
            <th className="p-3">Alérgeno</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((ingredient) => (
            <tr
              key={ingredient.id}
              className="border-t hover:bg-blue-50"
            >

              <td className="p-3 font-medium">
                {ingredient.nombre}
              </td>

              <td className="p-3">
                {ingredient.descripcion || "-"}
              </td>

              <td className="p-3">
                {ingredient.es_alergeno
                  ? "Sí"
                  : "No"}
              </td>

              <td className="p-3">
                <div className="flex gap-2">

                  <Button
                    variant="secondary"
                    onClick={() =>
                      onEdit(ingredient)
                    }
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      onDelete(ingredient.id)
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