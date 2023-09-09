import Database from "better-sqlite3";
import { publicProcedure, router } from "@/server/trpc-server";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { eq } from "drizzle-orm";
import { todos } from "@/db/schema";
import { z } from "zod";

const db = drizzle(new Database("sqlite.db"));
migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return db.select().from(todos).all();
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    await db
      .insert(todos)
      .values({
        content: opts.input,
        done: 0,
      })
      .run();

    return true;
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
      })
    )
    .mutation(async (opts) => {
      await db
        .update(todos)
        .set({ done: opts.input.done })
        .where(eq(todos.id, opts.input.id))
        .run();
      return true;
    }),
});

export type AppRouter = typeof appRouter;
