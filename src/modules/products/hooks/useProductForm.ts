import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../../../shared/lib/cloudinary";
import { updateProductImages } from "../../../shared/api/producto.api";
import { addProductToCategory, removeProductFromCategory } from "../../../shared/api/productoCategoria.api";
import { addIngredientToProduct, removeIngredientFromProduct } from "../../../shared/api/productoIngrediente.api";
import { useProducts } from "./useProduct";
import { getApiErrorMessage } from "../../../shared/lib/apiError";
import type { ProductoRead, ProductoCreate, IngredienteEntry } from "../types/Producto";

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

const emptyForm: ProductFormState = {
  nombre: "",
  descripcion: "",
  precio_base: "",
  imagenes_url: "",
  stock_cantidad: "0",
  disponible: true,
  unidad_venta_id: "",
  categoriaIds: [],
  ingredientes: [],
};

const toForm = (product: ProductoRead): ProductFormState => ({
  nombre: product.nombre,
  descripcion: product.descripcion ?? "",
  precio_base: String(product.precio_base),
  imagenes_url: Array.isArray(product.imagenes_url) ? (product.imagenes_url[0] ?? "") : "",
  stock_cantidad: String(product.stock_cantidad),
  disponible: product.disponible,
  unidad_venta_id: product.unidad_venta_id ? String(product.unidad_venta_id) : "",
  categoriaIds: product.categorias?.map((c) => c.id) ?? [],
  // ingredientes existentes sin cantidad (el backend no la devuelve en ProductoRead)
  ingredientes: product.ingredientes?.map((i) => ({
    ingrediente_id: i.id,
    cantidad: 1,
    unidad_medida_id: 0,
    es_removible: true,
  })) ?? [],
});

export const useProductForm = () => {
  const queryClient = useQueryClient();
  const { createProduct, updateProduct, deleteProduct } = useProducts();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ProductoRead | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [formError, setFormError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [viewing, setViewing] = useState<ProductoRead | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const startCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError("");
    setOpen(true);
  };

  const handleImageChange = async (file: File) => {
    setUploadingImage(true);
    setFormError("");
    try {
      const url = await uploadImage(file, "productos");
      setForm((prev) => ({ ...prev, imagenes_url: url }));
    } catch {
      setFormError("No se pudo subir la imagen. Intentá de nuevo.");
    } finally {
      setUploadingImage(false);
    }
  };

  const startEdit = (product: ProductoRead) => {
    setEditing(product);
    setForm(toForm(product));
    setFormError("");
    setOpen(true);
  };

  const startView = (product: ProductoRead) => {
    setViewing(product);
    setDetailOpen(true);
  };

  const syncCategories = async (
    productId: number,
    selectedIds: number[],
    currentProduct?: ProductoRead,
  ) => {
    const currentIds = currentProduct?.categorias?.map((c) => c.id) ?? [];
    const toAdd = selectedIds.filter((id) => !currentIds.includes(id));
    const toRemove = currentIds.filter((id) => !selectedIds.includes(id));

    await Promise.all([
      ...toAdd.map((categoriaId, index) =>
        addProductToCategory({ producto_id: productId, categoria_id: categoriaId, es_principal: index === 0 }),
      ),
      ...toRemove.map((categoriaId) =>
        removeProductFromCategory({ producto_id: productId, categoria_id: categoriaId }),
      ),
    ]);
  };

  const syncIngredientes = async (
    productId: number,
    entries: IngredienteEntry[],
    currentProduct?: ProductoRead,
  ) => {
    const currentIds = currentProduct?.ingredientes?.map((i) => i.id) ?? [];
    const selectedIds = entries.map((e) => e.ingrediente_id);

    const toRemove = currentIds.filter((id) => !selectedIds.includes(id));
    // Para ingredientes ya existentes que siguen seleccionados: remove+re-add para actualizar cantidad/unidad
    const toReplace = entries.filter((e) => currentIds.includes(e.ingrediente_id));
    const toAdd = entries.filter((e) => !currentIds.includes(e.ingrediente_id));

    await Promise.all(
      toRemove.map((id) => removeIngredientFromProduct({ producto_id: productId, ingrediente_id: id })),
    );
    await Promise.all(
      toReplace.map((e) => removeIngredientFromProduct({ producto_id: productId, ingrediente_id: e.ingrediente_id })),
    );
    await Promise.all(
      [...toReplace, ...toAdd]
        .filter((e) => e.unidad_medida_id > 0 && e.cantidad > 0)
        .map((e) =>
          addIngredientToProduct({
            producto_id: productId,
            ingrediente_id: e.ingrediente_id,
            cantidad: e.cantidad,
            unidad_medida_id: e.unidad_medida_id,
            es_removible: e.es_removible,
          }),
        ),
    );
  };

  const onSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();

    if (!form.nombre.trim()) { setFormError("El nombre es obligatorio."); return; }

    const precio = Number(form.precio_base);
    const stock = Number(form.stock_cantidad);

    if (Number.isNaN(precio) || precio < 0) { setFormError("Precio inválido."); return; }
    if (Number.isNaN(stock) || stock < 0) { setFormError("Stock inválido."); return; }

    const ingInvalidos = form.ingredientes.filter((e) => e.unidad_medida_id === 0);
    if (ingInvalidos.length > 0) {
      setFormError("Todos los ingredientes seleccionados deben tener unidad de medida.");
      return;
    }

    const payload: ProductoCreate = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim() || undefined,
      precio_base: precio,
      stock_cantidad: stock,
      disponible: form.disponible,
      unidad_venta_id: form.unidad_venta_id ? Number(form.unidad_venta_id) : null,
      categorias_ids: form.categoriaIds,
      ingredientes_ids: form.ingredientes.map((e) => e.ingrediente_id),
    };

    try {
      let productId = editing?.id;

      if (editing) {
        await updateProduct.mutateAsync({ id: editing.id, payload });
      } else {
        const created = await createProduct.mutateAsync(payload);
        productId = created.id;
      }

      if (!productId) throw new Error("Sin ID de producto");

      if (form.imagenes_url.trim()) {
        await updateProductImages(productId, [form.imagenes_url.trim()]);
      }

      await syncCategories(productId, form.categoriaIds, editing ?? undefined);
      await syncIngredientes(productId, form.ingredientes, editing ?? undefined);
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
    open, setOpen,
    editing,
    form, setForm,
    formError,
    startCreate, startEdit,
    onSubmit, onDelete,
    viewing, detailOpen, setDetailOpen,
    startView,
    handleImageChange,
    uploadingImage,
    isSubmitting: createProduct.isPending || updateProduct.isPending,
  };
};
