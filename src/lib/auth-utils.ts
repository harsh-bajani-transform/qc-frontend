"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/modules/auth/lib/session";
import type { UserSessionData } from "@/modules/auth/types";

/**
 * Require an authenticated user for server components/routes.
 * If no session is found, redirects to the sign-in page.
 */
export const requireAuth = async (): Promise<UserSessionData> => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return session;
};

/**
 * Require an unauthenticated user for server components/routes.
 * If a session exists, redirects to the dashboard (or home).
 */
export const requireUnauth = async (): Promise<UserSessionData | null> => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return session;
};