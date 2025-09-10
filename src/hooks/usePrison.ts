// src/hooks/usePrison.ts
import { getPrison } from "@/api/getPrison";
import { useQuery } from "@tanstack/react-query";

export function usePrison() {
  return useQuery({
    queryKey: ["prison"],
    queryFn: getPrison,
    staleTime: 1000 * 60,
    retry: 1,
  });
}
