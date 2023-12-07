import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
  getManyByPost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) => {
      const { postId } = input;
      return ctx.db.post.findFirst({
        where: {
          id: postId,
        },
        select: {
          _count: {
            select: {
              comments: true,
            },
          },
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: {
                select: {
                  image: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
});
