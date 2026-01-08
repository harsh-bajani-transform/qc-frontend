import { TRPCError, initTRPC } from '@trpc/server';
import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { getSession } from '@/modules/auth/lib/session';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const cookieStore = await cookies();
  const headersList = await headers();
  
  return { 
    cookies: cookieStore,
    headers: headersList,
  };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createTRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await getSession();
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }
  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});