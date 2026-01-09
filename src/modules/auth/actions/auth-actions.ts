"use server";

import { clearSession } from "@/modules/auth/lib/session";
import { redirect } from "next/navigation";

export const logout = async () => {
  await clearSession();
  redirect("/sign-in");
};
