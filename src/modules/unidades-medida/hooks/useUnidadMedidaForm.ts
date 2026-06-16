import { useState } from "react";
import { useUnidadesMedida } from "./useUnidadesMedida";
import { getApiErrorMessage } from "../../../shared/lib/apiError";
import type { UnidadMedidaRead } from "../types/UnidadMedida";

type FormState = { nombre: string; simbolo: string; tipo: string };

const empty: FormState = { nombre: "", simbolo: "", tipo: "contable" };

const toForm = (u: UnidadMedidaRead): FormState => ({
  nombre: u.nombre,
  simbolo: u.simbolo,
  tipo: u.tipo,
});

export const useUnidadMedidaForm = () => {
  const { crear, actualizar, eliminar } = useUnidadesMedida();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<UnidadMedidaRead | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [formError, setFormError] = useState("");

  const startCreate = () => {
    setEditing(null);
    setForm(empty);
    setFormError("");
    setOpen(true);
  };

  const startEdit = (u: UnidadMedidaRead) => {
    setEditing(u);
    setForm(toForm(u));
    setFormError("");
    setOpen(true);
  };

  const onSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.simbolo.trim()) {
      setFormError("Nombre y símbolo son obligatorios.");
      return;
    }
    const payload = { nombre: form.nombre.trim(), simbolo: form.simbolo.trim(), tipo: form.tipo };
    try {
      if (editing) {
        await actualizar.mutateAsync({ id: editing.id, data: payload });
      } else {
        await crear.mutateAsync(payload);
      }
      setOpen(false);
      setEditing(null);
      setForm(empty);
      setFormError("");
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    }
  };

  const onDelete = async (id: number) => {
    try {
      await eliminar.mutateAsync(id);
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    }
  };

  return {
    open, setOpen,
    editing,
    form, setForm,
    formError,
    startCreate, startEdit,
    onSubmit, onDelete,
    isSubmitting: crear.isPending || actualizar.isPending,
  };
};
