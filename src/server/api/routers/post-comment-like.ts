import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postCommentLikeRouter = createTRPCRouter({
  toggle: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { commentId } = input;

      const like = await ctx.db.postCommentLike.findFirst({
        where: {
          AND: {
            commentId,
            userId: ctx.session.user.id,
          },
        },
      });

      if (like) {
        await ctx.db.postCommentLike.delete({
          where: {
            id: like.id,
          },
        });
      } else {
        await ctx.db.postCommentLike.create({
          data: {
            commentId,
            userId: ctx.session.user.id,
          },
        });
      }

      return await ctx.db.postComment.findFirst({
        where: {
          id: commentId,
        },

        select: {
          _count: {
            select: {
              likes: true,
            },
          },
          likes: {
            where: {
              userId: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
