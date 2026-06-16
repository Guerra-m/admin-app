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

    handleImageChange,
    uploadingImage,

    isSubmitting,
  } = useCategoryForm();

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
            Categorías
          </h1>

          <p
            className="
              text-sm
              text-on-surface-variant
              font-admin
              mt-1
            "
          >
            Gestión completa de categorías del sistema
          </p>

        </div>

        <Button
          type="button"
          onClick={startCreate}
        >
          Nueva categoría
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
          Cargando categorías...
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

          <CategoriesTable
            categories={data}
            onEdit={startEdit}
            onDelete={(id) => void onDelete(id)}
          />

        </div>

      )}

      {/* Modal */}
      <CategoryFormModal
        open={open}
        editing={editing}
        form={form}
        formError={formError}
        isSubmitting={isSubmitting}
        uploadingImage={uploadingImage}
        categories={data}
        onClose={() => setOpen(false)}
        onChange={setForm}
        onSubmit={onSubmit}
        onImageChange={handleImageChange}
      />

    </section>
  );
};