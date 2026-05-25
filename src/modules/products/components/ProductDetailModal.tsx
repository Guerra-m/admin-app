import { Modal } from "../../../shared/components/Modal";
import type { ProductoRead } from "../types/Producto";

type Props = {
  open: boolean;
  product: ProductoRead | null;
  onClose: () => void;
};

export const ProductDetailModal = ({
  open,
  product,
  onClose,
}: Props) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Detalle del producto"
    >
      <div className="space-y-4">

        <div>
          <h3>{product.nombre}</h3>
          <p>{product.descripcion}</p>
        </div>

        <div>
          <strong>Precio:</strong>
          ${product.precio_base}
        </div>

        <div>
          <strong>Stock:</strong>
          {product.stock_cantidad}
        </div>

        <div>
          <strong>Categorías:</strong>

          {product.categorias?.map((c) => (
            <div key={c.id}>
              {c.nombre}
            </div>
          ))}
        </div>

      </div>
    </Modal>
  );
};