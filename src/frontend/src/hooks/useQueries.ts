import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Cookie } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllCookies() {
  const { actor, isFetching } = useActor();
  return useQuery<Cookie[]>({
    queryKey: ["cookies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCookies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendChatMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error("No actor");
      return actor.sendChatMessage(message);
    },
  });
}
