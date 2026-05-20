import { Link } from "react-router-dom";

import { Button } from "../../../shared/components/Button";

import type { ProductoRead } from "../types/ProductoRead";

type Props = {
  products: ProductoRead[];
  onEdit: (product: ProductoRead) => void;
  onDelete: (id: number) => void;
};

export const ProductsTable = ({
  products,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full text-sm">

        <thead className="bg-blue-400 text-left">
          <tr>
            <th className="p-3">Imagen</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Disponible</th>
            <th className="p-3">Categorías</th>
            <th className="p-3">Ingredientes</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const coverImage =
              product.imagenes_url[0];

            return (
              <tr
                key={product.id}
                className="border-t hover:bg-blue-50"
              >

                <td className="p-3">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={product.nombre}
                      className="h-32 w-32 rounded-md border object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">
                      Sin imagen
                    </span>
                  )}
                </td>

                <td className="p-3 font-medium">
                  {product.nombre}
                </td>

                <td className="p-3">
                  ${product.precio_base}
                </td>

                <td className="p-3">
                  {product.stock_cantidad}
                </td>

                <td className="p-3">
                  {product.disponible
                    ? "Sí"
                    : "No"}
                </td>

                <td className="p-3">
                  {product.categorias.length
                    ? product.categorias
                        .map((c) => c.nombre)
                        .join(", ")
                    : "-"}
                </td>

                <td className="p-3">
                  {product.ingredientes.length
                    ? product.ingredientes
                        .map((i) => i.nombre)
                        .join(", ")
                    : "-"}
                </td>

                <td className="p-3">
                  <div className="flex flex-wrap gap-2">

                    <Link
                      to={`/productos/${product.id}`}
                      className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      Ver
                    </Link>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        onEdit(product)
                      }
                    >
                      Editar
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() =>
                        onDelete(product.id)
                      }
                    >
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