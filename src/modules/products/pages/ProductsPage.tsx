import { ProductFormModal } from "../components/ProductFormModal";

import { ProductsTable } from "../components/ProductsTable";

import { Button } from "../../../shared/components/Button";

import { useCategories } from "../../categories/hooks/useCategories";
import { useIngredients } from "../../ingredients/hooks/useIngredients";
import { useProducts } from "../hooks/useProducts";

import { useProductForm } from "../hooks/useProductForm";

import { getApiErrorMessage } from "../../../shared/lib/apiError";

export const ProductsPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useProducts();

  const { data: categories = [] } =
    useCategories();

  const { data: ingredients = [] } =
    useIngredients();

  const {
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

    isSubmitting,
  } = useProductForm();

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Productos
        </h1>

        <Button
          type="button"
          onClick={startCreate}
        >
          Nuevo producto
        </Button>

      </div>

      {formError && (
        <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      {isLoading && (
        <p>Cargando productos...</p>
      )}

      {isError && (
        <p className="text-red-700">
          Error: {getApiErrorMessage(error)}
        </p>
      )}

      {!isLoading && !isError && (
        <ProductsTable
          products={data}
          onEdit={startEdit}
          onDelete={(id) => void onDelete(id)}
        />
      )}

      <ProductFormModal
        open={open}
        editing={editing}
        form={form}
        categories={categories}
        ingredients={ingredients}
        formError={formError}
        isSubmitting={isSubmitting}
        toggleId={toggleId}
        onClose={() => setOpen(false)}
        onChange={setForm}
        onSubmit={onSubmit}
      />

    </section>
  );
};