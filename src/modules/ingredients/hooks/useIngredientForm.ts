import { useState } from "react";

import { useIngredients } from "./useIngredients";

import { getApiErrorMessage } from "../../../shared/lib/apiError";
import type { IngredienteRead } from "../types/Ingredients";


type IngredientFormState = {
  nombre: string;
  descripcion: string;
  es_alergeno: boolean;
};

const emptyForm: IngredientFormState = {
  nombre: "",
  descripcion: "",
  es_alergeno: false,
};

const toForm = (
  ingredient: IngredienteRead,
): IngredientFormState => ({
  nombre: ingredient.nombre,
  descripcion: ingredient.descripcion ?? "",
  es_alergeno: ingredient.es_alergeno,
});

export const useIngredientForm = () => {
  const {
    createIngredient,
    updateIngredient, 
    deleteIngredient
  } = useIngredients();


  const [open, setOpen] = useState(false);

  const [editing, setEditing] =
    useState<IngredienteRead | null>(null);

  const [form, setForm] =
    useState<IngredientFormState>(emptyForm);

  const [formError, setFormError] =
    useState("");

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
    setOpen(true);
  };

  const startEdit = (
    ingredient: IngredienteRead,
  ) => {
    setEditing(ingredient);
    setForm(toForm(ingredient));
    setFormError("");
    setOpen(true);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.nombre.trim()) {
      setFormError(
        "El nombre es obligatorio.",
      );

      return;
    }

    const payload = {
      nombre: form.nombre.trim(),

      descripcion:
        form.descripcion.trim() || undefined,

      es_alergeno: form.es_alergeno,
    };

    try {
      if (editing) {
        await updateIngredient.mutateAsync({
          id: editing.id,
          payload,
        });
      } else {
        await createIngredient.mutateAsync(
          payload,
        );
      }

      setOpen(false);

      setEditing(null);

      setForm(emptyForm);

      setFormError("");
    } catch (submitError) {
      setFormError(
        getApiErrorMessage(submitError),
      );
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteIngredient.mutateAsync(id);
    } catch (deleteError) {
      setFormError(
        getApiErrorMessage(deleteError),
      );
    }
  };

  return {
    open,
    setOpen,

    editing,

    form,
    setForm,

    formError,

    startCreate,
    startEdit,

    onSubmit,
    onDelete,

    isSubmitting:
      createIngredient.isPending ||
      updateIngredient.isPending,
  };
};