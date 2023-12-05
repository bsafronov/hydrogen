import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { title } = input;
      return ctx.db.post.create({
        data: {
          title,
        },
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        shortDescription: z.string().optional(),
        fullDescription: z.string().optional(),
        link: z.string().optional(),
        images: z.array(z.string()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { id, fullDescription, shortDescription, title, link, images } =
        input;
      return ctx.db.post.update({
        where: {
          id,
        },
        data: {
          title,
          shortDescription,
          fullDescription,
          link,
          images,
        },
      });
    }),
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.post.delete({
        where: {
          id,
        },
      });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const { id } = input;

      return ctx.db.post.findUnique({
        where: {
          id,
        },
      });
    }),
  getMany: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({});
  }),
});
