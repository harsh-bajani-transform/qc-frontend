import {  createTRPCRouter } from '../init';
import { userRouter } from '@/modules/auth/server/procedure';
export const appRouter = createTRPCRouter({
  user: userRouter
})
// export type definition of API
export type AppRouter = typeof appRouter;