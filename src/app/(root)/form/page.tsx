import { requireAuth } from "@/lib/auth-utils";
import { FormView } from "@/modules/form/ui/views/form-view";

const Page = async () => {
  await requireAuth();
  return <FormView />;
};

export default Page;
