import { requireAuth } from "@/lib/auth-utils";
import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";
import React from "react";

const Page = async () => {
  await requireAuth();
  return <DashboardView />;
};

export default Page;
