import { publicProcedure, router } from "@/server/trpc-server"

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30000];
  }),
});

export type AppRouter = typeof appRouter;
