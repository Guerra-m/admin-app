import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";
import type { UnidadMedidaRead } from "../types/UnidadMedida";

type FormState = { nombre: string; simbolo: string; tipo: string };

type Props = {
  open: boolean;
  editing: UnidadMedidaRead | null;
  form: FormState;
  formError: string;
  isSubmitting: boolean;
  onClose: () => void;
  onChange: (next: FormState) => void;
  onSubmit: (e: { preventDefault(): void }) => void;
};

const inputCls = `
  w-full rounded-lg border border-outline bg-surface-container-low
  px-4 py-3 text-on-surface placeholder:text-on-surface-variant
  outline-none transition-all duration-200
  focus:border-primary focus:ring-2 focus:ring-primary/20
`;

export const UnidadMedidaFormModal = ({
  open, editing, form, formError, isSubmitting, onClose, onChange, onSubmit,
}: Props) => (
  <Modal open={open} onClose={onClose} title={editing ? "Editar unidad" : "Nueva unidad de medida"}>
    <form className="grid gap-5 font-admin" onSubmit={(e) => void onSubmit(e)}>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-on-surface">Nombre</label>
        <input
          value={form.nombre}
          onChange={(e) => onChange({ ...form, nombre: e.target.value })}
          placeholder="kilogramo"
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-on-surface">Símbolo</label>
        <input
          value={form.simbolo}
          onChange={(e) => onChange({ ...form, simbolo: e.target.value })}
          placeholder="kg"
          maxLength={10}
          className={inputCls}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-on-surface">Tipo</label>
        <select
          value={form.tipo}
          onChange={(e) => onChange({ ...form, tipo: e.target.value })}
          className={inputCls}
        >
          <option value="peso">Peso</option>
          <option value="volumen">Volumen</option>
          <option value="contable">Contable</option>
        </select>
      </div>

      {formError && (
        <div className="rounded-lg border border-error/30 bg-red-50 px-4 py-3 text-sm text-error">
          {formError}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose}
          className="border border-outline bg-surface-container text-on-surface hover:bg-surface-container-high">
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}
          className="bg-primary text-on-primary hover:opacity-90 shadow-warm">
          {editing ? "Guardar cambios" : "Crear unidad"}
        </Button>
      </div>

    </form>
  </Modal>
);
