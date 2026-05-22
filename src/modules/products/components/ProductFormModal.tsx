import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";

import type { CategoriaRead,  } from "../../categories/types/Categories";
import type { IngredienteRead } from "../../ingredients/types/Ingredients";
import type { ProductoRead } from "../../products/types/Producto";

type ProductFormState = {
  nombre: string;
  descripcion: string;
  precio_base: string;
  imagenes_url: string;
  stock_cantidad: string;
  disponible: boolean;
  categoriaIds: number[];
  ingredienteIds: number[];
};

type Props = {
  open: boolean;
  editing: ProductoRead | null;
  form: ProductFormState;
  categories: CategoriaRead[];
  ingredients: IngredienteRead[];
  formError: string;
  isSubmitting: boolean;
  toggleId: (
    ids: number[],
    id: number
  ) => number[];
  onClose: () => void;
  onChange: (
    next: ProductFormState
  ) => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
};

const inputStyles = `
  w-full

  rounded-md

  border
  border-outline-variant

  bg-surface-container-lowest

  px-4
  py-3

  text-sm
  text-on-surface

  outline-none

  transition-all
  duration-200

  focus:border-primary
  focus:ring-2
  focus:ring-primary/20
`;

export const ProductFormModal = ({
  open,
  editing,
  form,
  categories,
  ingredients,
  formError,
  isSubmitting,
  toggleId,
  onClose,
  onChange,
  onSubmit,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        editing
          ? "Editar producto"
          : "Nuevo producto"
      }
    >
      <form
        className="
          grid
          gap-stack-md
        "
        onSubmit={(event) =>
          void onSubmit(event)
        }
      >

        {/* NOMBRE */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-on-surface
              font-admin
            "
          >
            Nombre
          </label>

          <input
            value={form.nombre}
            onChange={(event) =>
              onChange({
                ...form,
                nombre: event.target.value,
              })
            }
            className={inputStyles}
            placeholder="Hamburguesa completa"
          />

        </div>

        {/* DESCRIPCIÓN */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-on-surface
              font-admin
            "
          >
            Descripción
          </label>

          <textarea
            value={form.descripcion}
            onChange={(event) =>
              onChange({
                ...form,
                descripcion: event.target.value,
              })
            }
            className={`
              ${inputStyles}
              min-h-28
              resize-none
            `}
            placeholder="Descripción del producto"
          />

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4">

          {/* PRECIO */}
          <div className="space-y-2">

            <label
              className="
                text-sm
                font-semibold
                text-on-surface
                font-admin
              "
            >
              Precio base
            </label>

            <input
              value={form.precio_base}
              onChange={(event) =>
                onChange({
                  ...form,
                  precio_base: event.target.value,
                })
              }
              className={inputStyles}
              placeholder="0.00"
              type="number"
              min={0}
              step="0.01"
            />

          </div>

          {/* STOCK */}
          <div className="space-y-2">

            <label
              className="
                text-sm
                font-semibold
                text-on-surface
                font-admin
              "
            >
              Stock
            </label>

            <input
              value={form.stock_cantidad}
              onChange={(event) =>
                onChange({
                  ...form,
                  stock_cantidad: event.target.value,
                })
              }
              className={inputStyles}
              placeholder="0"
              type="number"
              min={0}
            />

          </div>

        </div>

        {/* IMÁGENES */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-on-surface
              font-admin
            "
          >
            URLs de imágenes
          </label>

          <input
            value={form.imagenes_url}
            onChange={(event) =>
              onChange({
                ...form,
                imagenes_url: event.target.value,
              })
            }
            className={inputStyles}
            placeholder="https://..."
          />

        </div>

        {/* DISPONIBLE */}
        <label
          className="
            flex
            items-center
            gap-3

            rounded-md

            bg-surface-container

            border
            border-outline-variant

            px-4
            py-3

            cursor-pointer
          "
        >
          <input
            type="checkbox"
            checked={form.disponible}
            onChange={(event) =>
              onChange({
                ...form,
                disponible:
                  event.target.checked,
              })
            }
            className="
              h-4
              w-4
              accent-primary
            "
          />

          <span
            className="
              text-sm
              font-medium
              text-on-surface
            "
          >
            Producto disponible
          </span>
        </label>

        {/* CATEGORÍAS */}
        <fieldset
          className="
            rounded-lg

            border
            border-outline-variant

            bg-surface-container-low

            p-4
          "
        >
          <legend
            className="
              px-2
              text-sm
              font-semibold
              text-primary
            "
          >
            Categorías
          </legend>

          <div
            className="
              grid
              max-h-36
              gap-2
              overflow-y-auto
              mt-2
            "
          >
            {categories.map((category) => (
              <label
                key={category.id}
                className="
                  flex
                  items-center
                  gap-3

                  rounded-md

                  px-3
                  py-2

                  hover:bg-surface-container

                  transition-colors
                  duration-200

                  cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={form.categoriaIds.includes(
                    category.id
                  )}
                  onChange={() =>
                    onChange({
                      ...form,
                      categoriaIds:
                        toggleId(
                          form.categoriaIds,
                          category.id
                        ),
                    })
                  }
                  className="
                    h-4
                    w-4
                    accent-primary
                  "
                />

                <span className="text-sm">
                  {category.nombre}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* INGREDIENTES */}
        <fieldset
          className="
            rounded-lg

            border
            border-outline-variant

            bg-surface-container-low

            p-4
          "
        >
          <legend
            className="
              px-2
              text-sm
              font-semibold
              text-primary
            "
          >
            Ingredientes
          </legend>

          <div
            className="
              grid
              max-h-36
              gap-2
              overflow-y-auto
              mt-2
            "
          >
            {ingredients.map((ingredient) => (
              <label
                key={ingredient.id}
                className="
                  flex
                  items-center
                  gap-3

                  rounded-md

                  px-3
                  py-2

                  hover:bg-surface-container

                  transition-colors
                  duration-200

                  cursor-pointer
                "
              >
                <input
                  type="checkbox"
                  checked={form.ingredienteIds.includes(
                    ingredient.id
                  )}
                  onChange={() =>
                    onChange({
                      ...form,
                      ingredienteIds:
                        toggleId(
                          form.ingredienteIds,
                          ingredient.id
                        ),
                    })
                  }
                  className="
                    h-4
                    w-4
                    accent-primary
                  "
                />

                <span className="text-sm">
                  {ingredient.nombre}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* ERROR */}
        {formError && (
          <div
            className="
              rounded-md

              border
              border-error/30

              bg-error/10

              px-4
              py-3

              text-sm
              text-error
            "
          >
            {formError}
          </div>
        )}

        {/* ACTIONS */}
        <div
          className="
            flex
            justify-end
            gap-3
            pt-2
          "
        >
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {editing
              ? "Guardar cambios"
              : "Crear producto"}
          </Button>
        </div>

      </form>
    </Modal>
  );
};