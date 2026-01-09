import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: async () => {
      // In the route handler, we need to create context differently
      // The context will be created in init.ts using Next.js cookies/headers
      return createTRPCContext();
    },
  });

export { handler as GET, handler as POST };