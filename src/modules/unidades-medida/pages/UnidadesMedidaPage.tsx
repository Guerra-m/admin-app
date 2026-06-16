import { Button } from "../../../shared/components/Button";
import { useUnidadesMedida } from "../hooks/useUnidadesMedida";
import { useUnidadMedidaForm } from "../hooks/useUnidadMedidaForm";
import { UnidadesMedidaTable } from "../components/UnidadesMedidaTable";
import { UnidadMedidaFormModal } from "../components/UnidadMedidaFormModal";
import { getApiErrorMessage } from "../../../shared/lib/apiError";

export const UnidadesMedidaPage = () => {
  const { query } = useUnidadesMedida();
  const {
    open, setOpen,
    editing,
    form, setForm,
    formError,
    startCreate, startEdit,
    onSubmit, onDelete,
    isSubmitting,
  } = useUnidadMedidaForm();

  return (
    <section className="space-y-stack-lg">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary font-store">
            Unidades de Medida
          </h1>
          <p className="text-sm text-on-surface-variant font-admin mt-1">
            Unidades usadas en ingredientes y productos
          </p>
        </div>
        <Button type="button" onClick={startCreate}>
          Nueva unidad
        </Button>
      </div>

      {formError && (
        <div className="rounded-md border border-error bg-error/10 px-4 py-3 text-sm text-error shadow-sm">
          {formError}
        </div>
      )}

      {query.isLoading && (
        <div className="rounded-lg bg-surface-container p-6 text-on-surface-variant shadow-warm">
          Cargando unidades...
        </div>
      )}

      {query.isError && (
        <div className="rounded-lg border border-error bg-error/10 p-4 text-error">
          Error: {getApiErrorMessage(query.error)}
        </div>
      )}

      {!query.isLoading && !query.isError && (
        <UnidadesMedidaTable
          unidades={query.data ?? []}
          onEdit={startEdit}
          onDelete={(id) => void onDelete(id)}
        />
      )}

      <UnidadMedidaFormModal
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
