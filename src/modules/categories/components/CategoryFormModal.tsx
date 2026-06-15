import { useRef } from "react";
import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";

import type { CategoriaRead } from "../types/Categories";

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
  uploadingImage: boolean;
  onClose: () => void;
  onChange: (next: CategoryFormState) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onImageChange: (file: File) => void;
};

export const CategoryFormModal = ({
  open,
  editing,
  form,
  formError,
  isSubmitting,
  uploadingImage,
  onClose,
  onChange,
  onSubmit,
  onImageChange,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        className="grid gap-5 font-admin"
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
            className="
              w-full

              rounded-lg

              border
              border-outline

              bg-surface-container-low

              px-4
              py-3

              text-on-surface
              placeholder:text-on-surface-variant

              outline-none

              transition-all
              duration-200

              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
            placeholder="Ingrese el nombre"
          />

        </div>

        {/* DESCRIPCION */}
        <div className="space-y-2">

          <label
            className="
              text-sm
              font-semibold
              text-on-surface
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
            className="
              min-h-[120px]
              w-full

              rounded-lg

              border
              border-outline

              bg-surface-container-low

              px-4
              py-3

              text-on-surface
              placeholder:text-on-surface-variant

              outline-none

              transition-all
              duration-200

              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
            placeholder="Ingrese una descripción"
          />

        </div>

        {/* IMAGEN */}
        <div className="space-y-2">

          <label className="text-sm font-semibold text-on-surface">
            Imagen de la categoría
          </label>

          {form.imagen_url && (
            <img
              src={form.imagen_url}
              alt="preview"
              referrerPolicy="no-referrer"
              className="h-32 w-32 rounded-lg object-cover border border-outline-variant"
            />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageChange(file);
            }}
          />

          <Button
            type="button"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
          >
            {uploadingImage
              ? "Subiendo..."
              : form.imagen_url
              ? "Cambiar imagen"
              : "Subir imagen"}
          </Button>

        </div>

        {/* PARENT ID */}
        {!editing && (

          <div className="space-y-2">

            <label
              className="
                text-sm
                font-semibold
                text-on-surface
              "
            >
              Parent ID
            </label>

            <input
              value={form.parent_id}
              onChange={(event) =>
                onChange({
                  ...form,
                  parent_id: event.target.value,
                })
              }
              className="
                w-full

                rounded-lg

                border
                border-outline

                bg-surface-container-low

                px-4
                py-3

                text-on-surface
                placeholder:text-on-surface-variant

                outline-none

                transition-all
                duration-200

                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
              placeholder="Opcional"
              type="number"
              min={1}
            />

          </div>

        )}

        {/* ERROR */}
        {formError && (

          <div
            className="
              rounded-lg

              border
              border-error/30

              bg-red-50

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
        <div className="flex justify-end gap-3 pt-2">

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="
              border
              border-outline

              bg-surface-container

              text-on-surface

              hover:bg-surface-container-high
            "
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="
              bg-primary
              text-on-primary

              hover:opacity-90

              shadow-warm
            "
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