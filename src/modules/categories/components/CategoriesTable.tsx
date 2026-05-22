import { Button } from "../../../shared/components/Button";

import type { CategoriaRead } from "../types/Categories";

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
              Parent ID
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

          {categories.map((category) => (

            <tr
              key={category.id}
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
                {category.nombre}
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
                {category.descripcion || "-"}
              </td>

              {/* PARENT */}
              <td
                className="
                  px-6
                  py-4

                  text-sm
                  text-on-surface-variant
                "
              >
                {category.parent_id ?? "-"}
              </td>

              {/* ACTIONS */}
              <td className="px-6 py-4">

                <div className="flex gap-3">

                  {/* EDIT */}
                  <Button
                    variant="secondary"
                    onClick={() =>
                      onEdit(category)
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
                      onDelete(category.id)
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
          {categories.length === 0 && (

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
                No hay categorías registradas
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
};