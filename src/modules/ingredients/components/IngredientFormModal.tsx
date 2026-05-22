import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";

import type { IngredienteRead } from "../types/Ingredients";

type IngredientFormState = {
  nombre: string;
  descripcion: string;
  es_alergeno: boolean;
};

type Props = {
  open: boolean;
  editing: IngredienteRead | null;
  form: IngredientFormState;
  formError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: (next: IngredientFormState) => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
};

export const IngredientFormModal = ({
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
          ? "Editar ingrediente"
          : "Nuevo ingrediente"
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

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.es_alergeno}
            onChange={(event) =>
              onChange({
                ...form,
                es_alergeno: event.target.checked,
              })
            }
          />

          Es alérgeno
        </label>

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
              : "Crear ingrediente"}
          </Button>

        </div>
      </form>
    </Modal>
  );
};