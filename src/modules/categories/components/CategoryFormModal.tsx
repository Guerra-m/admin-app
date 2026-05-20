import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";

import type { CategoriaRead } from "../types/CategoriaRead";

type CategoryFormState = {
  nombre: string;
  descripcion: string;
  imagen_url: string;
  parent_id: string;
};

type Props = {
  open: boolean;
  editing: CategoriaRead | null;
  form: CategoryFormState;
  formError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: (next: CategoryFormState) => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
};

export const CategoryFormModal = ({
  open,
  editing,
  form,
  formError,
  isSubmitting,
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
          ? "Editar categoría"
          : "Nueva categoría"
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
          value={form.imagen_url}
          onChange={(event) =>
            onChange({
              ...form,
              imagen_url: event.target.value,
            })
          }
          className="rounded-md border p-2"
          placeholder="URL imagen"
        />

        {!editing && (
          <input
            value={form.parent_id}
            onChange={(event) =>
              onChange({
                ...form,
                parent_id: event.target.value,
              })
            }
            className="rounded-md border p-2"
            placeholder="Parent ID (opcional)"
            type="number"
            min={1}
          />
        )}

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
              : "Crear categoría"}
          </Button>

        </div>
      </form>
    </Modal>
  );
};