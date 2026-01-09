"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import type { UserSessionData } from "../types";

/**
 * Hook to get current user session
 */
export function useSession() {
  const trpc = useTRPC();
  
  const { data: session, isLoading, error } = useQuery(
    trpc.user.getSession.queryOptions()
  );

  return {
    session: (session ?? null) as UserSessionData | null,
    isLoading,
    isAuthenticated: !!session,
    error,
  };
}

