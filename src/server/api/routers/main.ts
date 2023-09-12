import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import isStrongPassword from "validator/lib/isStrongPassword";

const loginObject = z.object(
  {
    username: z.string(), //.refine((val) => isStrongPassword(val), {
    // "message": "Please provide a strong apssword",
    // }),
    password: z.string(),
  },
);

export const mainRouter = createTRPCRouter({
  main: publicProcedure
    .input(z.object({ text: z.string(), id: z.number() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  login: publicProcedure
    .input(loginObject)
    .mutation(async ({ input }) => {
      if (input.username !== "prabal") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect username or password",
        });
      }
      return { "message": "succesfully logged in", "status": 200 };
    }),
});
