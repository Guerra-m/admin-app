import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { useProducts } from "../hooks/useProduct";

import { getApiErrorMessage } from "../../../shared/lib/apiError";

import type { ProductoRead } from "../types/Producto";

export const ProductDetailPage = () => {
  const params = useParams();

  const productId = Number(params.id);

  const { findProductById } = useProducts();

  const [data, setData] =
    useState<ProductoRead | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<unknown>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);

        const product =
          await findProductById(productId);

        setData(product);

      } catch (err) {
        setError(err);

      } finally {
        setIsLoading(false);
      }
    };

    if (
      Number.isFinite(productId) &&
      productId > 0
    ) {
      void loadProduct();
    }
  }, [productId]);

  if (!productId || Number.isNaN(productId)) {
    return <p>El id es inválido.</p>;
  }

  if (isLoading) {
    return <p>Cargando detalle...</p>;
  }

  if (error) {
    return (
      <p className="text-red-700">
        {getApiErrorMessage(error)}
      </p>
    );
  }

  if (!data) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <section className="space-y-4">
      <Link
        to="/productos"
        className="text-blue-700 hover:underline"
      >
        ← Volver a productos
      </Link>

      <h1 className="text-2xl font-bold text-blue-900">
        {data.nombre}
      </h1>

      <p className="text-gray-700">
        {data.descripcion || "Sin descripción"}
      </p>

      {data.imagenes_url.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {data.imagenes_url.map(
            (imageUrl, index) => (
              <img
                key={`${imageUrl}-${index}`}
                src={imageUrl}
                alt={`${data.nombre} ${index + 1}`}
                className="h-56 w-80 flex-none rounded-lg border object-cover"
                referrerPolicy="no-referrer"
              />
            )
          )}
        </div>
      )}

      <div className="grid gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-slate-800">
        <p>
          <strong>Precio:</strong>
          ${data.precio_base}
        </p>

        <p>
          <strong>Stock:</strong>
          {data.stock_cantidad}
        </p>

        <p>
          <strong>Disponible:</strong>
          {data.disponible ? "Sí" : "No"}
        </p>

        <p>
          <strong>Categorías:</strong>{" "}
          {data.categorias.length
            ? data.categorias
                .map((c) => c.nombre)
                .join(", ")
            : "Sin categorías"}
        </p>

        <p>
          <strong>Ingredientes:</strong>{" "}
          {data.ingredientes.length
            ? data.ingredientes
                .map((i) => i.nombre)
                .join(", ")
            : "Sin ingredientes"}
        </p>
      </div>
    </section>
  );
};