import { IngredientFormModal } from "../components/IngredientFormModal";

import { IngredientsTable } from "../components/IngredientsTable";

import { useIngredients } from "../hooks/useIngredients";

import { useIngredientForm } from "../hooks/useIngredientForm";

import { getApiErrorMessage } from "../../../shared/lib/apiError";

export const IngredientsPage = () => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useIngredients();

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
  } = useIngredientForm();

  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Ingredientes
        </h1>

        <button
          type="button"
          onClick={startCreate}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nuevo ingrediente
        </button>
      </div>

      {formError && (
        <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {formError}
        </p>
      )}

      {isLoading && (
        <p>Cargando ingredientes...</p>
      )}

      {isError && (
        <p className="text-red-700">
          {getApiErrorMessage(error)}
        </p>
      )}

      {!isLoading && !isError && (
        <IngredientsTable
          ingredients={data}
          onEdit={startEdit}
          onDelete={(id) => void onDelete(id)}
        />
      )}

      <IngredientFormModal
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