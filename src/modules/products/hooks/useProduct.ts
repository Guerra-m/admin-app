import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProducts,
  createProduct as createProductApi,
  deleteProduct as deleteProductApi,
  getProductById,
  updateProduct as updateProductApi,
} from "../../../shared/api/producto.api";

import type {
  ProductoCreate,
  ProductoUpdate,
} from "../types/Producto";

export const PRODUCTS_QUERY_KEY = ["products"] as const;

export const useProducts = (params?: {
  min_precio?: number;
  max_precio?: number;
  limit?: number;
  offset?: number;
}) => {
  const queryClient = useQueryClient();

  // =========================
  // GET ALL
  // =========================
  const productsQuery = useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, params],

    queryFn: () => getProducts(params),
  });

  // =========================
  // GET BY ID
  // =========================
  const findProductById = async (id: number) => {
    if (!Number.isFinite(id) || id <= 0) {
      throw new Error("Id inválido");
    }

    return getProductById(id);
  };

  // =========================
  // CREATE
  // =========================
  const createProduct = useMutation({
    mutationFn: (payload: ProductoCreate) =>
      createProductApi(payload),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PRODUCTS_QUERY_KEY,
      });
    },
  });

  // =========================
  // DELETE
  // =========================
  const deleteProduct = useMutation({
    mutationFn: (id: number) =>
      deleteProductApi(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: PRODUCTS_QUERY_KEY,
      });
    },
  });

  // =========================
  // UPDATE
  // =========================
  const updateProduct = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ProductoUpdate;
    }) => updateProductApi(id, payload),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: PRODUCTS_QUERY_KEY,
      });

      void queryClient.invalidateQueries({
        queryKey: [
          ...PRODUCTS_QUERY_KEY,
          variables.id,
        ],
      });
    },
  });

  return {
    ...productsQuery,

    findProductById,

    createProduct,
    deleteProduct,
    updateProduct,
  };
};