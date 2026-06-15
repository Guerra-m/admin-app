import { useState } from "react";

import { useCategories } from "./useCategories";
import { uploadImage } from "../../../shared/lib/cloudinary";
import { getApiErrorMessage } from "../../../shared/lib/apiError";

import type { CategoriaRead } from "../types/Categories";

type CategoryFormState = {
  nombre: string;
  descripcion: string;
  imagen_url: string;
  parent_id: string;
};

const emptyForm: CategoryFormState = {
  nombre: "",
  descripcion: "",
  imagen_url: "",
  parent_id: "",
};

const toForm = (
  category: CategoriaRead
): CategoryFormState => ({
  nombre: category.nombre,
  descripcion: category.descripcion ?? "",
  imagen_url: category.imagen_url ?? "",
  parent_id: category.parent_id
    ? String(category.parent_id)
    : "",
});

export const useCategoryForm = () => {
  const {
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  const [open, setOpen] = useState(false);

  const [editing, setEditing] =
    useState<CategoriaRead | null>(null);

  const [form, setForm] =
    useState<CategoryFormState>(emptyForm);

  const [formError, setFormError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = async (file: File) => {
    setUploadingImage(true);
    setFormError("");
    try {
      const url = await uploadImage(file, "categorias");
      setForm((prev) => ({ ...prev, imagen_url: url }));
    } catch {
      setFormError("No se pudo subir la imagen. Intentá de nuevo.");
    } finally {
      setUploadingImage(false);
    }
  };

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
    setOpen(true);
  };

  const startEdit = (category: CategoriaRead) => {
    setEditing(category);
    setForm(toForm(category));
    setFormError("");
    setOpen(true);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.nombre.trim()) {
      setFormError("El nombre es obligatorio.");
      return;
    }

    const parsedParentId = Number(form.parent_id);

    const payload = {
      nombre: form.nombre.trim(),
      descripcion:
        form.descripcion.trim() || undefined,

      imagen_url:
        form.imagen_url.trim() || undefined,

      parent_id:
        form.parent_id.trim() === ""
          ? undefined
          : Number.isNaN(parsedParentId)
            ? undefined
            : parsedParentId,
    };

    try {
      if (editing) {
        await updateCategory.mutateAsync({
          id: editing.id,
          payload,
        });
      } else {
        await createCategory.mutateAsync(payload);
      }

      setOpen(false);
      setEditing(null);
      setForm(emptyForm);
      setFormError("");
    } catch (submitError) {
      setFormError(
        getApiErrorMessage(submitError)
      );
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteCategory.mutateAsync(id);
    } catch (deleteError) {
      setFormError(
        getApiErrorMessage(deleteError)
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

    handleImageChange,
    uploadingImage,

    isSubmitting:
      createCategory.isPending ||
      updateCategory.isPending,
  };
};