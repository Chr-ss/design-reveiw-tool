import { createTRPCRouter } from "@/server/api/trpc";
import { designOptionRouter } from "@/server/api/routers/design-option";

export const appRouter = createTRPCRouter({
  designOption: designOptionRouter,
});

export type AppRouter = typeof appRouter;
