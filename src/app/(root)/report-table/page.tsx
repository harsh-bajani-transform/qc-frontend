import { requireAuth } from "@/lib/auth-utils";
import { ReportTableView } from "@/modules/reports/ui/views/report-table-view";

const Page = async () => {
  await requireAuth();
  return <ReportTableView />;
};

export default Page;
