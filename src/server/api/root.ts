import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { postLikeRouter } from "./routers/post-like";
import { postCommentRouter } from "./routers/post-comment";
import { userRouter } from "./routers/user";
import { postCommentLikeRouter } from "./routers/post-comment-like";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  postLike: postLikeRouter,
  postComment: postCommentRouter,
  postCommentLike: postCommentLikeRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
