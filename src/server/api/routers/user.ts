import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAdminRights: protectedProcedure
    .input(
      z.object({
        password: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (input.password !== process.env.ADMIN_PASSWORD) {
        throw new Error("Wrong password");
      }

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          role: "ADMIN",
        },
      });
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { name, image } = input;

      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name,
          image,
        },
      });
    }),
});
