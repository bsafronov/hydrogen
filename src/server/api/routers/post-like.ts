import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postLikeRouter = createTRPCRouter({
  toggle: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { postId } = input;

      const like = await ctx.db.postLike.findFirst({
        where: {
          AND: {
            postId,
            userId: ctx.session.user.id,
          },
        },
      });

      if (like) {
        return ctx.db.postLike.delete({
          where: {
            id: like.id,
          },
        });
      }

      return ctx.db.postLike.create({
        data: {
          postId,
          userId: ctx.session.user.id,
        },
      });
    }),
});
