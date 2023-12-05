import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postCommentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ postId: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { postId, description } = input;

      return ctx.db.postComment.create({
        data: {
          postId,
          userId: ctx.session.user.id,
          description,
        },
      });
    }),
});
