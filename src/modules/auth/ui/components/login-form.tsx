"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/modules/auth/validations";
import type { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignInProps {
  onSuccess?: () => void;
}

type SignInFormValues = z.infer<typeof signInSchema>;

export function LoginForm({ onSuccess }: SignInProps) {
  // onCancel is part of the interface but not used in this component
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const signInUser = useMutation(
    trpc.user.signIn.mutationOptions({
      onSuccess: async () => {
        // Invalidate user-related queries and session after successful login
        await queryClient.invalidateQueries();
        // Refresh session query
        await queryClient.invalidateQueries(
          trpc.user.getSession.queryOptions()
        );
        onSuccess?.();
        router.push("/dashboard");
        toast.success("Signed In Successfully");
      },
      onError: (error) => {
        toast.error(error.message);
        if (error.data?.code === "FORBIDDEN") {
          router.push("/upgrade");
        }
      },
    })
  );

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInFormValues) {
    signInUser.mutate(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your TFS QC Eval account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={signInUser.isPending}>
                  {signInUser.isPending ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="bg-primary relative hidden md:flex md:flex-col items-center justify-center gap-y-4">
            <ShieldCheck className="w-16 h-16 stroke-white" />
            <h1 className="text-white text-lg font-semibold">TFS QC Eval</h1>
          </div>
        </CardContent>
      </Card>
      <p className="text-muted-foreground px-6 text-center text-sm">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  );
}
