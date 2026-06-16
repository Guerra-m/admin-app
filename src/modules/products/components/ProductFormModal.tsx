import { useRef } from "react";
import { Modal } from "../../../shared/components/Modal";
import { Button } from "../../../shared/components/Button";

import type { CategoriaRead } from "../../categories/types/Categories";
import type { IngredienteRead } from "../../ingredients/types/Ingredients";
import type { UnidadMedidaRead } from "../../unidades-medida/types/UnidadMedida";
import type { ProductoRead, IngredienteEntry } from "../types/Producto";

type ProductFormState = {
  nombre: string;
  descripcion: string;
  precio_base: string;
  imagenes_url: string;
  stock_cantidad: string;
  disponible: boolean;
  unidad_venta_id: string;
  categoriaIds: number[];
  ingredientes: IngredienteEntry[];
};

type Props = {
  open: boolean;
  editing: ProductoRead | null;
  form: ProductFormState;
  categories: CategoriaRead[];
  ingredients: IngredienteRead[];
  unidades: UnidadMedidaRead[];
  formError: string;
  isSubmitting: boolean;
  uploadingImage: boolean;
  onClose: () => void;
  onChange: (next: ProductFormState) => void;
  onSubmit: (event: { preventDefault(): void }) => void;
  onImageChange: (file: File) => void;
};

const inputStyles = `
  w-full rounded-md border border-outline-variant
  bg-surface-container-lowest px-4 py-3
  text-sm text-on-surface outline-none
  transition-all duration-200
  focus:border-primary focus:ring-2 focus:ring-primary/20
`;

const toggleCategoryId = (ids: number[], id: number) =>
  ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];

export const ProductFormModal = ({
  open, editing, form, categories, ingredients, unidades,
  formError, isSubmitting, uploadingImage,
  onClose, onChange, onSubmit, onImageChange,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isIngredienteSelected = (id: number) =>
    form.ingredientes.some((e) => e.ingrediente_id === id);

  const getEntry = (id: number): IngredienteEntry =>
    form.ingredientes.find((e) => e.ingrediente_id === id) ?? {
      ingrediente_id: id,
      cantidad: 1,
      unidad_medida_id: 0,
      es_removible: true,
    };

  const toggleIngrediente = (id: number) => {
    if (isIngredienteSelected(id)) {
      onChange({ ...form, ingredientes: form.ingredientes.filter((e) => e.ingrediente_id !== id) });
    } else {
      onChange({ ...form, ingredientes: [...form.ingredientes, getEntry(id)] });
    }
  };

  const updateEntry = (id: number, patch: Partial<IngredienteEntry>) => {
    onChange({
      ...form,
      ingredientes: form.ingredientes.map((e) =>
        e.ingrediente_id === id ? { ...e, ...patch } : e,
      ),
    });
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Editar producto" : "Nuevo producto"}>
      <form className="grid gap-5 font-admin" onSubmit={(e) => void onSubmit(e)}>

        {/* NOMBRE */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-on-surface">Nombre</label>
          <input
            value={form.nombre}
            onChange={(e) => onChange({ ...form, nombre: e.target.value })}
            className={inputStyles}
            placeholder="Hamburguesa completa"
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-on-surface">Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={(e) => onChange({ ...form, descripcion: e.target.value })}
            className={`${inputStyles} min-h-24 resize-none`}
            placeholder="Descripción del producto"
          />
        </div>

        {/* PRECIO + STOCK */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface">Precio base</label>
            <input
              value={form.precio_base}
              onChange={(e) => onChange({ ...form, precio_base: e.target.value })}
              className={inputStyles}
              placeholder="0.00"
              type="number"
              min={0}
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-on-surface">Stock</label>
            <input
              value={form.stock_cantidad}
              onChange={(e) => onChange({ ...form, stock_cantidad: e.target.value })}
              className={inputStyles}
              placeholder="0"
              type="number"
              min={0}
            />
          </div>
        </div>

        {/* UNIDAD DE VENTA */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-on-surface">Unidad de venta</label>
          <select
            value={form.unidad_venta_id}
            onChange={(e) => onChange({ ...form, unidad_venta_id: e.target.value })}
            className={inputStyles}
          >
            <option value="">Sin unidad</option>
            {unidades.map((u) => (
              <option key={u.id} value={String(u.id)}>
                {u.nombre} ({u.simbolo})
              </option>
            ))}
          </select>
        </div>

        {/* IMAGEN */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-on-surface">Imagen del producto</label>
          {form.imagenes_url && (
            <img
              src={form.imagenes_url}
              alt="preview"
              referrerPolicy="no-referrer"
              className="h-28 w-28 rounded-lg object-cover border border-outline-variant"
            />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onImageChange(f); }}
          />
          <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage}>
            {uploadingImage ? "Subiendo..." : form.imagenes_url ? "Cambiar imagen" : "Subir imagen"}
          </Button>
        </div>

        {/* DISPONIBLE */}
        <label className="flex items-center gap-3 rounded-md bg-surface-container border border-outline-variant px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.disponible}
            onChange={(e) => onChange({ ...form, disponible: e.target.checked })}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm font-medium text-on-surface">Producto disponible</span>
        </label>

        {/* CATEGORÍAS */}
        <fieldset className="rounded-lg border border-outline-variant bg-surface-container-low p-4">
          <legend className="px-2 text-sm font-semibold text-primary">Categorías</legend>
          <div className="grid max-h-36 gap-2 overflow-y-auto mt-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-surface-container transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.categoriaIds.includes(cat.id)}
                  onChange={() => onChange({ ...form, categoriaIds: toggleCategoryId(form.categoriaIds, cat.id) })}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm">{cat.nombre}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* INGREDIENTES */}
        <fieldset className="rounded-lg border border-outline-variant bg-surface-container-low p-4">
          <legend className="px-2 text-sm font-semibold text-primary">Ingredientes</legend>
          <div className="grid max-h-56 gap-2 overflow-y-auto mt-2">
            {ingredients.map((ing) => {
              const selected = isIngredienteSelected(ing.id);
              const entry = selected ? getEntry(ing.id) : null;
              return (
                <div key={ing.id} className="rounded-md border border-transparent hover:border-outline-variant/50 transition-colors">
                  <label className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleIngrediente(ing.id)}
                      className="h-4 w-4 accent-primary shrink-0"
                    />
                    <span className="text-sm flex-1">{ing.nombre}</span>
                    {selected && (
                      <label className="flex items-center gap-1 ml-auto">
                        <input
                          type="checkbox"
                          checked={entry?.es_removible ?? true}
                          onChange={(e) => updateEntry(ing.id, { es_removible: e.target.checked })}
                          className="h-3.5 w-3.5 accent-primary"
                        />
                        <span className="text-xs text-on-surface-variant">removible</span>
                      </label>
                    )}
                  </label>

                  {selected && entry && (
                    <div className="flex gap-2 px-3 pb-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          min={0.01}
                          step="0.01"
                          value={entry.cantidad}
                          onChange={(e) => updateEntry(ing.id, { cantidad: Number(e.target.value) })}
                          placeholder="Cantidad"
                          className="w-full rounded border border-outline-variant bg-surface-container-lowest px-2 py-1.5 text-sm outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex-1">
                        <select
                          value={entry.unidad_medida_id === 0 ? "" : String(entry.unidad_medida_id)}
                          onChange={(e) => updateEntry(ing.id, { unidad_medida_id: Number(e.target.value) })}
                          className="w-full rounded border border-outline-variant bg-surface-container-lowest px-2 py-1.5 text-sm outline-none focus:border-primary"
                        >
                          <option value="">Unidad…</option>
                          {unidades.map((u) => (
                            <option key={u.id} value={String(u.id)}>
                              {u.simbolo}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </fieldset>

        {/* ERROR */}
        {formError && (
          <div className="rounded-md border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
            {formError}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit" disabled={isSubmitting}>
            {editing ? "Guardar cambios" : "Crear producto"}
          </Button>
        </div>

      </form>
    </Modal>
  );
};
