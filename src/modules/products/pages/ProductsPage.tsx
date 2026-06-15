import { ProductFormModal } from "../components/ProductFormModal";
import { ProductsTable } from "../components/ProductsTable";

import { Button } from "../../../shared/components/Button";

import { useCategories } from "../../categories/hooks/useCategories";
import { useIngredients } from "../../ingredients/hooks/useIngredients";
import { useProducts } from "../hooks/useProduct";

import { useProductForm } from "../hooks/useProductForm";

import { getApiErrorMessage } from "../../../shared/lib/apiError";

import { ProductDetailModal } from "../components/ProductDetailModal";
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

    viewing,
    detailOpen,
    setDetailOpen,

    startCreate,
    startEdit,
    startView,

    onSubmit,
    onDelete,

    toggleId,

    handleImageChange,
    uploadingImage,
    isSubmitting,
  } = useProductForm();

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
            Productos
          </h1>

          <p
            className="
              text-sm
              text-on-surface-variant
              font-admin
              mt-1
            "
          >
            Gestión completa de productos del sistema
          </p>
        </div>

        <Button
          type="button"
          onClick={startCreate}
        >
          Nuevo producto
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
          Cargando productos...
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
          <ProductsTable
            products={data}
            onView={startView}
            onEdit={startEdit}
            onDelete={(id) => void onDelete(id)}
          />
        </div>
      )}

      {/* Modal */}
      <ProductFormModal
        open={open}
        editing={editing}
        form={form}
        categories={categories}
        ingredients={ingredients}
        formError={formError}
        isSubmitting={isSubmitting}
        uploadingImage={uploadingImage}
        toggleId={toggleId}
        onClose={() => setOpen(false)}
        onChange={setForm}
        onSubmit={onSubmit}
        onImageChange={handleImageChange}
      />
      
      <ProductDetailModal
        open={detailOpen}
        product={viewing}
        onClose={() => setDetailOpen(false)}
      />

    </section>
  );
};