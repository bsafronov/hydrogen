import { TRPCError } from "@trpc/server";
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
  delete: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { commentId } = input;

      const user = ctx.session.user;
      const isAdmin = user.role === "ADMIN";

      const post = await ctx.db.postComment.findFirst({
        where: {
          id: commentId,
        },
      });

      if (!post) {
        return new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (isAdmin) {
        return ctx.db.postComment.delete({
          where: {
            id: commentId,
          },
        });
      }

      if (post.userId !== user.id) {
        return new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return ctx.db.postComment.delete({
        where: {
          id: commentId,
        },
      });
    }),
  getManyByPost: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) => {
      const { postId } = input;
      // return ctx.db.post.findFirst({
      //   where: {
      //     id: postId,
      //   },
      //   select: {
      //     _count: {
      //       select: {
      //         comments: true,
      //       },
      //     },
      //     comments: {
      //       select: {
      //         _count: {
      //           select: {
      //             likes: true,
      //           },
      //         },
      //       },
      //       orderBy: {
      //         createdAt: "desc",
      //       },
      //       include: {
      //         user: {
      //           select: {
      //             image: true,
      //             name: true,
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      return ctx.db.postComment.findMany({
        where: {
          postId,
        },
        include: {
          _count: {
            select: {
              likes: true,
            },
          },
          user: {
            select: {
              image: true,
              name: true,
            },
          },
          likes: {
            take: ctx.session?.user.id ? 1 : 0,
            where: {
              userId: ctx.session?.user.id,
            },
          },
        },
      });
    }),
});
