import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  addProductToCategory,
  removeProductFromCategory,
} from "../../../shared/api/productoCategoria.api";

import {
  addIngredientToProduct,
  removeIngredientFromProduct,
} from "../../../shared/api/productoIngrediente.api";

import { useProducts } from "./useProduct";
import { getApiErrorMessage } from "../../../shared/lib/apiError";

import type { ProductoRead, ProductoCreate } from "../types/Producto";

type ProductFormState = {
  nombre: string;
  descripcion: string;
  precio_base: string;
  imagenes_url: string; // 👈 string único
  stock_cantidad: string;
  disponible: boolean;
  categoriaIds: number[];
  ingredienteIds: number[];
};

const emptyForm: ProductFormState = {
  nombre: "",
  descripcion: "",
  precio_base: "",
  imagenes_url: "",
  stock_cantidad: "0",
  disponible: true,
  categoriaIds: [],
  ingredienteIds: [],
};

const toForm = (product: ProductoRead): ProductFormState => ({
  nombre: product.nombre,
  descripcion: product.descripcion ?? "",
  precio_base: String(product.precio_base),

  // 👇 backend string → frontend string
  imagenes_url: product.imagenes_url ?? "",

  stock_cantidad: String(product.stock_cantidad),
  disponible: product.disponible,

  categoriaIds: product.categorias.map((item) => item.id),
  ingredienteIds: product.ingredientes.map((item) => item.id),
});

const toggleId = (ids: number[], id: number) =>
  ids.includes(id)
    ? ids.filter((i) => i !== id)
    : [...ids, id];

export const useProductForm = () => {
  const queryClient = useQueryClient();

  const { createProduct, updateProduct, deleteProduct } =
    useProducts();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProductoRead | null>(null);

  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [formError, setFormError] = useState("");

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
    setOpen(true);
  };

  const startEdit = (product: ProductoRead) => {
    setEditing(product);
    setForm(toForm(product));
    setFormError("");
    setOpen(true);
  };

  const syncRelations = async (
    productId: number,
    selectedCategoryIds: number[],
    selectedIngredientIds: number[],
    currentProduct?: ProductoRead,
  ) => {
    const currentCategoryIds =
      currentProduct?.categorias.map((c) => c.id) ?? [];

    const currentIngredientIds =
      currentProduct?.ingredientes.map((i) => i.id) ?? [];

    const categoriesToAdd = selectedCategoryIds.filter(
      (id) => !currentCategoryIds.includes(id),
    );

    const categoriesToRemove = currentCategoryIds.filter(
      (id) => !selectedCategoryIds.includes(id),
    );

    const ingredientsToAdd = selectedIngredientIds.filter(
      (id) => !currentIngredientIds.includes(id),
    );

    const ingredientsToRemove = currentIngredientIds.filter(
      (id) => !selectedIngredientIds.includes(id),
    );

    await Promise.all([
      ...categoriesToAdd.map((categoriaId, index) =>
        addProductToCategory({
          producto_id: productId,
          categoria_id: categoriaId,
          es_principal: index === 0,
        }),
      ),

      ...categoriesToRemove.map((categoriaId) =>
        removeProductFromCategory({
          producto_id: productId,
          categoria_id: categoriaId,
        }),
      ),

      ...ingredientsToAdd.map((ingredienteId) =>
        addIngredientToProduct({
          producto_id: productId,
          ingrediente_id: ingredienteId,
          es_removible: true,
        }),
      ),

      ...ingredientsToRemove.map((ingredienteId) =>
        removeIngredientFromProduct({
          producto_id: productId,
          ingrediente_id: ingredienteId,
        }),
      ),
    ]);
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.nombre.trim()) {
      setFormError("El nombre es obligatorio.");
      return;
    }

    const precio = Number(form.precio_base);
    const stock = Number(form.stock_cantidad);

    if (Number.isNaN(precio) || precio < 0) {
      setFormError("Precio inválido.");
      return;
    }

    if (Number.isNaN(stock) || stock < 0) {
      setFormError("Stock inválido.");
      return;
    }

    const payload: ProductoCreate = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim() || undefined,
      precio_base: precio,

      // 
      imagenes_url: form.imagenes_url.trim() || "",

      stock_cantidad: stock,
      disponible: form.disponible,

      categorias_ids: form.categoriaIds,
      ingredientes_ids: form.ingredienteIds,
    };

    try {
      let productId = editing?.id;

      if (editing) {
        await updateProduct.mutateAsync({
          id: editing.id,
          payload,
        });
      } else {
        const created = await createProduct.mutateAsync(payload);
        productId = created.id;
      }

      if (!productId) throw new Error("Sin ID de producto");

      await syncRelations(
        productId,
        form.categoriaIds,
        form.ingredienteIds,
        editing ?? undefined,
      );

      await queryClient.invalidateQueries({ queryKey: ["products"] });

      setOpen(false);
      setEditing(null);
      setForm(emptyForm);
      setFormError("");
    } catch (err) {
      setFormError(getApiErrorMessage(err));
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteProduct.mutateAsync(id);
    } catch (err) {
      setFormError(getApiErrorMessage(err));
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
    toggleId,

    isSubmitting:
      createProduct.isPending || updateProduct.isPending,
  };
};