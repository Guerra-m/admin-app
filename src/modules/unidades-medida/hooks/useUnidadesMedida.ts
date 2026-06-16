import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unidadMedidaApi } from "../../../shared/api/unidadMedida.api";
import type { UnidadMedidaCreate, UnidadMedidaUpdate } from "../types/UnidadMedida";

export const UNIDADES_KEY = ["unidades-medida"] as const;

export const useUnidadesMedida = () => {
  const qc = useQueryClient();
  const inv = () => qc.invalidateQueries({ queryKey: UNIDADES_KEY });

  const query = useQuery({ queryKey: UNIDADES_KEY, queryFn: unidadMedidaApi.listar });

  const crear = useMutation({
    mutationFn: (data: UnidadMedidaCreate) => unidadMedidaApi.crear(data),
    onSuccess: inv,
  });

  const actualizar = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UnidadMedidaUpdate }) =>
      unidadMedidaApi.actualizar(id, data),
    onSuccess: inv,
  });

  const eliminar = useMutation({
    mutationFn: (id: number) => unidadMedidaApi.eliminar(id),
    onSuccess: inv,
  });

  return { query, crear, actualizar, eliminar };
};
