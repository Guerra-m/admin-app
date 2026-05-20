import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";

import type { CategoriaRead } from "../../categories/types/CategoriaRead";
import type { IngredienteRead } from "../../ingredients/types/IngredienteRead";
import type { ProductoRead } from "../../products/types/ProductoRead";

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
        className="grid gap-3"
        onSubmit={(event) =>
          void onSubmit(event)
        }
      >
        <input
          value={form.nombre}
          onChange={(event) =>
            onChange({
              ...form,
              nombre: event.target.value,
            })
          }
          className="rounded-md border p-2"
          placeholder="Nombre"
        />

        <textarea
          value={form.descripcion}
          onChange={(event) =>
            onChange({
              ...form,
              descripcion: event.target.value,
            })
          }
          className="rounded-md border p-2"
          placeholder="Descripción"
        />

        <input
          value={form.precio_base}
          onChange={(event) =>
            onChange({
              ...form,
              precio_base: event.target.value,
            })
          }
          className="rounded-md border p-2"
          placeholder="Precio base"
          type="number"
          min={0}
          step="0.01"
        />

        <input
          value={form.stock_cantidad}
          onChange={(event) =>
            onChange({
              ...form,
              stock_cantidad: event.target.value,
            })
          }
          className="rounded-md border p-2"
          placeholder="Stock"
          type="number"
          min={0}
        />

        <input
          value={form.imagenes_url}
          onChange={(event) =>
            onChange({
              ...form,
              imagenes_url: event.target.value,
            })
          }
          className="rounded-md border p-2"
          placeholder="URLs de imagen separadas por coma"
        />

        <label className="flex items-center gap-2 text-sm">
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
          />

          Disponible
        </label>

        <fieldset className="space-y-2 rounded-md border p-3">
          <legend className="px-1 text-sm font-semibold">
            Categorías
          </legend>

          <div className="grid max-h-28 gap-1 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 text-sm"
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
                />

                {category.nombre}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2 rounded-md border p-3">
          <legend className="px-1 text-sm font-semibold">
            Ingredientes
          </legend>

          <div className="grid max-h-28 gap-1 overflow-y-auto">
            {ingredients.map((ingredient) => (
              <label
                key={ingredient.id}
                className="flex items-center gap-2 text-sm"
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
                />

                {ingredient.nombre}
              </label>
            ))}
          </div>
        </fieldset>

        {formError && (
          <p className="text-sm text-red-700">
            {formError}
          </p>
        )}

        <div className="flex justify-end gap-2">

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