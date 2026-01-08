import { requireUnauth } from "@/lib/auth-utils";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

const SignIn = async () => {
  await requireUnauth();
  return <SignInView />;
};

export default SignIn;
