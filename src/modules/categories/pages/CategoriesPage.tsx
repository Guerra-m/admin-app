import { CategoriesTable } from "../components/CategoriesTable";

import { CategoryFormModal } from "../components/CategoryFormModal";

import { Button } from "../../../shared/components/Button";

import { useCategories } from "../hooks/useCategories";

import { useCategoryForm } from "../hooks/useCategoryForm";

import { getApiErrorMessage } from "../../../shared/lib/apiError";

export const CategoriesPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useCategories();

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

    isSubmitting,
  } = useCategoryForm();

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Categorías
        </h1>

        <Button
          type="button"
          onClick={startCreate}
        >
          Nueva categoría
        </Button>

      </div>

      {formError && (
        <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      {isLoading && (
        <p>Cargando categorías...</p>
      )}

      {isError && (
        <p className="text-red-700">
          {getApiErrorMessage(error)}
        </p>
      )}

      {!isLoading && !isError && (
        <CategoriesTable
          categories={data}
          onEdit={startEdit}
          onDelete={(id) => void onDelete(id)}
        />
      )}

      <CategoryFormModal
        open={open}
        editing={editing}
        form={form}
        formError={formError}
        isSubmitting={isSubmitting}
        onClose={() => setOpen(false)}
        onChange={setForm}
        onSubmit={onSubmit}
      />

    </section>
  );
};