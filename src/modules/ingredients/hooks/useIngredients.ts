import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getIngredients,
  getIngredientById,
  createIngredient as createIngredientApi,
  updateIngredient as updateIngredientApi,
  deleteIngredient as deleteIngredientApi,
} from "../../../shared/api/ingrediente.api";

import type {
  IngredienteCreate,
  IngredienteUpdate,
} from "../types/Ingredients";

export const INGREDIENTS_QUERY_KEY = ["ingredients"] as const;

export const useIngredients = () => {
  const queryClient = useQueryClient();

  // GET ALL
  const ingredientsQuery = useQuery({
    queryKey: INGREDIENTS_QUERY_KEY,

    queryFn: getIngredients,
  });

  // GET BY ID
  const ingredientById = async (id: number) => {
    if (!Number.isFinite(id) || id <= 0) {
      throw new Error("Id inválido");
    }

    return getIngredientById(id);
  };

  // CREATE
  const createIngredient = useMutation({
    mutationFn: (payload: IngredienteCreate) =>
      createIngredientApi(payload),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: INGREDIENTS_QUERY_KEY,
      });
    },
  });

  // UPDATE
  const updateIngredient = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: IngredienteUpdate;
    }) => updateIngredientApi(id, payload),

    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: INGREDIENTS_QUERY_KEY,
      });

      void queryClient.invalidateQueries({
        queryKey: [
          ...INGREDIENTS_QUERY_KEY,
          variables.id,
        ],
      });
    },
  });

  // DELETE
  const deleteIngredient = useMutation({
    mutationFn: (id: number) =>
      deleteIngredientApi(id),

    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: INGREDIENTS_QUERY_KEY,
      });
    },
  });

  return {
    ...ingredientsQuery,

    ingredientById,

    createIngredient,
    updateIngredient,
    deleteIngredient,
  };
};