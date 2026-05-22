import { IngredientFormModal } from "../components/IngredientFormModal";
import { IngredientsTable } from "../components/IngredientsTable";

import { Button } from "../../../shared/components/Button";

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

    <section className="space-y-stack-lg">

      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-primary
              font-store
            "
          >
            Ingredientes
          </h1>

          <p
            className="
              text-sm
              text-on-surface-variant
              font-admin
              mt-1
            "
          >
            Gestión completa de ingredientes del sistema
          </p>

        </div>

        <Button
          type="button"
          onClick={startCreate}
        >
          Nuevo ingrediente
        </Button>

      </div>

      {/* Error Form */}
      {formError && (

        <div
          className="
            rounded-md
            border
            border-error

            bg-error/10

            px-4
            py-3

            text-sm
            text-error

            shadow-sm
          "
        >
          {formError}
        </div>

      )}

      {/* Loading */}
      {isLoading && (

        <div
          className="
            rounded-lg
            bg-surface-container
            p-6
            text-on-surface-variant
            shadow-warm
          "
        >
          Cargando ingredientes...
        </div>

      )}

      {/* Error API */}
      {isError && (

        <div
          className="
            rounded-lg
            border
            border-error

            bg-error/10

            p-4

            text-error
          "
        >
          Error: {getApiErrorMessage(error)}
        </div>

      )}

      {/* Table */}
      {!isLoading && !isError && (

        <div
          className="
            rounded-xl
            bg-surface-container-lowest
            border
            border-outline-variant

            shadow-warm

            overflow-hidden
          "
        >

          <IngredientsTable
            ingredients={data}
            onEdit={startEdit}
            onDelete={(id) => void onDelete(id)}
          />

        </div>

      )}

      {/* Modal */}
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