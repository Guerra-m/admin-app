import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCategories,
  getCategoryById,
  createCategory as createCategoryApi,
  deleteCategory as deleteCategoryApi,
  updateCategory as updateCategoryApi,
} from "../../../shared/api/categoria.api";

import type {
  CategoriaCreate,
  CategoriaUpdate,
} from "../types/Categories";

export const CATEGORIES_QUERY_KEY = ["categories"] as const;

export const useCategories = () => {
  const queryClient = useQueryClient();

  // GET ALL
  const categoriesQuery = useQuery({
    queryKey: CATEGORIES_QUERY_KEY,

    queryFn: getCategories,
  });

  // GET BY ID
  const categoryById = async (id: number) => {
    if (!Number.isFinite(id) || id <= 0) {
      throw new Error("Id inválido");
    }

    return getCategoryById(id);
  };

  // CREATE
  const createCategory = useMutation({
    mutationFn: (payload: CategoriaCreate) =>
      createCategoryApi(payload),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
    },
  });

  // DELETE
  const deleteCategory = useMutation({
    mutationFn: (id: number) =>
      deleteCategoryApi(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });
    },
  });

  // UPDATE
  const updateCategory = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CategoriaUpdate;
    }) => updateCategoryApi(id, payload),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: CATEGORIES_QUERY_KEY,
      });

      void queryClient.invalidateQueries({
        queryKey: [
          ...CATEGORIES_QUERY_KEY,
          variables.id,
        ],
      });
    },
  });

  return {
    ...categoriesQuery,

    categoryById,

    createCategory,
    deleteCategory,
    updateCategory,
  };
};