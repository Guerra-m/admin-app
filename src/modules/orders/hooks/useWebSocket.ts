import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ORDERS_QUERY_KEY } from "./useOrders";

function getWsUrl(): string {
  const apiUrl = import.meta.env.VITE_API_URL as string ?? "http://localhost:8000";
  return apiUrl.replace(/^http/, "ws") + "/ws/pedidos";
}

export const useWebSocket = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(getWsUrl());

    ws.onmessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data as string) as { type: string };
        if (msg.type === "estado_actualizado") {
          void queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
        }
      } catch {
        // mensaje no JSON — ignorar
      }
    };

    ws.onerror = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [queryClient]);
};
