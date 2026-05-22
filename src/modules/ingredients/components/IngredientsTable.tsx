import { Button } from "../../../shared/components/Button";

import type { IngredienteRead } from "../types/Ingredients";

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

    <div
      className="
        overflow-x-auto

        rounded-2xl

        border
        border-outline-variant

        bg-surface-container-low

        shadow-warm
      "
    >

      <table className="min-w-full">

        {/* HEADER */}
        <thead
          className="
            border-b
            border-outline-variant

            bg-surface-container
          "
        >

          <tr>

            <th
              className="
                px-6
                py-4

                text-left
                text-sm
                font-bold
                font-admin

                text-on-surface
              "
            >
              Nombre
            </th>

            <th
              className="
                px-6
                py-4

                text-left
                text-sm
                font-bold
                font-admin

                text-on-surface
              "
            >
              Descripción
            </th>

            <th
              className="
                px-6
                py-4

                text-left
                text-sm
                font-bold
                font-admin

                text-on-surface
              "
            >
              Alérgeno
            </th>

            <th
              className="
                px-6
                py-4

                text-left
                text-sm
                font-bold
                font-admin

                text-on-surface
              "
            >
              Acciones
            </th>

          </tr>

        </thead>

        {/* BODY */}
        <tbody>

          {ingredients.map((ingredient) => (

            <tr
              key={ingredient.id}
              className="
                border-b
                border-outline-variant/50

                transition-colors
                duration-200

                hover:bg-surface-container
              "
            >

              {/* NOMBRE */}
              <td
                className="
                  px-6
                  py-4

                  font-semibold
                  font-admin

                  text-on-surface
                "
              >
                {ingredient.nombre}
              </td>

              {/* DESCRIPCION */}
              <td
                className="
                  px-6
                  py-4

                  text-sm
                  text-on-surface-variant
                "
              >
                {ingredient.descripcion || "-"}
              </td>

              {/* ALERGENO */}
              <td className="px-6 py-4">

                <span
                  className={`
                    inline-flex
                    items-center

                    rounded-full

                    px-3
                    py-1

                    text-xs
                    font-semibold

                    ${
                      ingredient.es_alergeno
                        ? `
                          bg-error/10
                          text-error
                        `
                        : `
                          bg-tertiary/10
                          text-tertiary
                        `
                    }
                  `}
                >
                  {ingredient.es_alergeno
                    ? "Alérgeno"
                    : "Seguro"}
                </span>

              </td>

              {/* ACTIONS */}
              <td className="px-6 py-4">

                <div className="flex gap-3">

                  {/* EDIT */}
                  <Button
                    variant="secondary"
                    onClick={() =>
                      onEdit(ingredient)
                    }
                    className="
                      border
                      border-outline

                      bg-surface-container

                      text-on-surface

                      hover:bg-surface-container-high
                    "
                  >
                    Editar
                  </Button>

                  {/* DELETE */}
                  <Button
                    variant="danger"
                    onClick={() =>
                      onDelete(ingredient.id)
                    }
                    className="
                      bg-error
                      text-white

                      hover:opacity-90
                    "
                  >
                    Eliminar
                  </Button>

                </div>

              </td>

            </tr>

          ))}

          {/* EMPTY */}
          {ingredients.length === 0 && (

            <tr>

              <td
                colSpan={4}
                className="
                  px-6
                  py-10

                  text-center
                  text-sm

                  text-on-surface-variant
                "
              >
                No hay ingredientes registrados
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};