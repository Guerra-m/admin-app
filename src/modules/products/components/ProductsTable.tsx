import { Link } from "react-router-dom";

import { Button } from "../../../shared/components/Button";

import type { ProductoRead } from "../types/Producto";

type Props = {
  products: ProductoRead[];

  onView: (product: ProductoRead) => void;

  onEdit: (product: ProductoRead) => void;

  onDelete: (id: number) => void;
};

// 🔥 SAFE PARSER
const getImages = (value?: string) =>
  (value ?? "")
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

export const ProductsTable = ({
  products,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div
      className="
        overflow-x-auto
        rounded-xl
        bg-surface-container-lowest
        border
        border-outline-variant
        shadow-warm
      "
    >
      <table className="min-w-full text-sm font-admin">

        {/* HEADER */}
        <thead className="bg-surface-container text-on-surface border-b border-outline-variant">
          <tr>
            <th className="p-4 text-left font-semibold">Imagen</th>
            <th className="p-4 text-left font-semibold">Nombre</th>
            <th className="p-4 text-left font-semibold">Precio</th>
            <th className="p-4 text-left font-semibold">Stock</th>
            <th className="p-4 text-left font-semibold">Disponible</th>
            <th className="p-4 text-left font-semibold">Categorías</th>
            <th className="p-4 text-left font-semibold">Ingredientes</th>
            <th className="p-4 text-left font-semibold">Acciones</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {products.map((product, index) => {
            const images = getImages(product.imagenes_url);
            const coverImage = images[0];

            return (
              <tr
                key={product.id}
                className={`
                  border-b border-outline-variant/40
                  transition-colors duration-200
                  hover:bg-surface-container-low
                  ${index % 2 === 0
                    ? "bg-surface-container-lowest"
                    : "bg-surface"
                  }
                `}
              >

                {/* IMAGE */}
                <td className="p-4">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={product.nombre}
                      className="
                        h-24 w-24
                        rounded-lg
                        border border-outline-variant
                        object-cover
                      "
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="
                      h-24 w-24
                      rounded-lg
                      bg-surface-container
                      flex items-center justify-center
                      text-xs text-on-surface-variant
                    ">
                      Sin imagen
                    </div>
                  )}
                </td>

                {/* NAME */}
                <td className="p-4">
                  <div className="font-semibold text-on-surface">
                    {product.nombre}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    ID #{product.id}
                  </div>
                </td>

                {/* PRICE */}
                <td className="p-4 text-on-surface">
                  ${product.precio_base}
                </td>

                {/* STOCK */}
                <td className="p-4">
                  <span
                    className={`
                      inline-flex rounded-full px-3 py-1 text-xs font-semibold
                      ${product.stock_cantidad > 0
                        ? "bg-tertiary/10 text-tertiary"
                        : "bg-error/10 text-error"
                      }
                    `}
                  >
                    {product.stock_cantidad}
                  </span>
                </td>

                {/* AVAILABLE */}
                <td className="p-4">
                  <span
                    className={`
                      inline-flex rounded-full px-3 py-1 text-xs font-semibold
                      ${product.disponible
                        ? "bg-tertiary/10 text-tertiary"
                        : "bg-error/10 text-error"
                      }
                    `}
                  >
                    {product.disponible ? "Disponible" : "No disponible"}
                  </span>
                </td>

                {/* CATEGORIES */}
                <td className="p-4 text-on-surface-variant">
                  {product.categorias?.length
                    ? product.categorias.map((c) => c.nombre).join(", ")
                    : "-"}
                </td>

                {/* INGREDIENTS */}
                <td className="p-4 text-on-surface-variant">
                  {product.ingredientes?.length
                    ? product.ingredientes.map((i) => i.nombre).join(", ")
                    : "-"}
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">

                    <Button
                      variant="secondary"
                      onClick={() => onView(product)}
                    >
                      Ver
                    </Button>

                    <Button variant="secondary" onClick={() => onEdit(product)}>
                      Editar
                    </Button>

                    <Button variant="danger" onClick={() => onDelete(product.id)}>
                      Eliminar
                    </Button>

                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};